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
import { updateUserQuick } from "../../user/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

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
    isGuest: boolean;
  };
}

export default function AddressContainer({ initialData }: AddressFormProps) {
  const [isEditing, setIsEditing] = useState(initialData?.isGuest || false);

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
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Update failed", error);
      });
  }

  const city = form.watch("city");

  return (
    <>
      {isEditing ? (
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
            <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thành phố</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={(value) => form.setValue("city", value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={city || "Chọn thành phố"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                      <SelectItem value="Hồ Chí Minh">TP. Hồ Chí Minh</SelectItem>
                      <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
      ) : (
        <AddressConfirm
          initialData={initialData}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </>
  );
}

function AddressConfirm({
  initialData,
  onEdit,
}: AddressFormProps & { onEdit: () => void }) {
  return (
    <div className="w-1/2 space-y-6 relative">
      <Button className="mt-4 absolute top-0 right-0" onClick={onEdit}>
        Edit
      </Button>
      <div>
        <Label>Tên người nhận</Label>
        <div>{initialData!.name}</div>
      </div>
      <div>
        <Label>Email</Label>
        <div>{initialData!.email}</div>
      </div>
      <div>
        <Label>Số điện thoại</Label>
        <div>{initialData!.phone}</div>
      </div>
      <div>
        <Label>Thành phố</Label>
        <div>{initialData!.city || "Không có thành phố"}</div>
      </div>
      <div>
        <Label>Địa chỉ</Label>
        <div>{initialData!.address}</div>
      </div>
    </div>
  );
}
