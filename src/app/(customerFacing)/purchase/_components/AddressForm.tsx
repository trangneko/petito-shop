"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { updateUserQuick } from "../../user/actions";

const message = "Mục này không được để trống.";
const phoneMess = "Số điện thoại không đúng định dạng";

const AddressFormSchema = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .min(1, { message: message })
    .max(30, { message: "Tên quá dài" }),
  email: z
    .string()
    .email({ message: "Email không hợp lệ" })
    .max(30, { message: "Email quá dài" }),
  phone: z.string().regex(/^[0-9+]{10,11}$/, { message: phoneMess }),
  city: z.string().min(1, "Vui lòng chọn thành phố"),
  address: z.string().min(1, message).max(80, "Địa chỉ quá dài"),
});

interface AddressFormProps {
  initialData?: {
    id: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    city?: string | null;
    address?: string | null;
  };
}

export default function AddressForm({ initialData }: AddressFormProps) {
  const defaultValues = {
    id: initialData?.id,
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    city: initialData?.city || "",
    address: initialData?.address || "",
  };

  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof AddressFormSchema>) {
    updateUserQuick(data.id, data)
      .then(() => {
        console.log("Update successful");
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
  }

  const city = form.watch("city");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors) // Log out any validation errors
        )}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên người nhận</FormLabel>
              <FormControl>
                <Input type={"text"} placeholder="Petito" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type={"email"}
                  placeholder="petitoshop@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input type={"tel"} placeholder="0123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{city || "Chọn thành phố"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => form.setValue("city", "Hà Nội")}>
              Hà Nội
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => form.setValue("city", "Hồ Chí Minh")}
            >
              TP. Hồ Chí Minh
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => form.setValue("city", "Đà Nẵng")}>
              Đà Nẵng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={"hidden"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  type={"text"}
                  placeholder="Số xx đường Láng, phường Láng Thượng, quận Đống Đa, HN"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  );
}
