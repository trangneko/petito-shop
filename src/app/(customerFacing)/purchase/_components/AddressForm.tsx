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

const message = "Mục này không được để trống.";
const phoneMess = "Số điện thoại không đúng định dạng";

const AddressFormSchema = z.object({
  buyerName: z
    .string()
    .min(1, { message: message })
    .max(30, { message: "Tên quá dài" }),
  buyerEmail: z
    .string()
    .email({ message: "Email không hợp lệ" })
    .max(30, { message: "Email quá dài" }),
  buyerPhone: z
    .string()
    .regex(/^[0-9+]{10,11}$/, { message: phoneMess }),
  buyerAddress: z
    .string()
    .min(2, { message: message })
    .max(80, { message: "Địa chỉ quá dài" }),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      buyerName: "",
      buyerEmail: "",
      buyerPhone: "",
      buyerAddress: "",
    },
  });

  function onSubmit(data: z.infer<typeof AddressFormSchema>) {
    console.log("Form Data:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="buyerName"
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
          name="buyerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type={"email"} placeholder="petitoshop@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buyerPhone"
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
          name="buyerAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input type={"text"}
                  placeholder="Số xx đường Láng, phường Láng Thượng, quận Đống Đa, HN"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// const AddressForm: React.FC = () => {
//   const [formValues, setFormValues] = useState({
//     buyerName: "",
//     buyerEmail: "",
//     buyerPhone: "",
//     buyerAddress: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = AddressFormSchema.safeParse(formValues);
//     if (result.success) {
//       console.log("Form Data:", result.data); // Process form submission here
//     } else {
//       setFormErrors(result.error.flatten().fieldErrors);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//         <Label htmlFor="name">Tên</Label>
//       <Input
//         name="buyerName"
//         placeholder="Enter your name"
//         value={formValues.buyerName}
//         onChange={handleChange}

//       />
//       {formErrors.buyerName && <div className="text-destructive">{error.name}</div>}
//       <Label htmlFor="name">Email</Label>
//       <Input
//         type="email"
//         name="buyerEmail"
//         placeholder="Enter your email"
//         value={formValues.buyerEmail}
//         onChange={handleChange}
//       />
//         error={formErrors.buyerEmail?.[0]}
//         <Label htmlFor="name">Số điện thoại</Label>
//       <Input
//         type="tel"
//         name="buyerPhone"
//         placeholder="Enter your phone number"
//         value={formValues.buyerPhone}
//         onChange={handleChange}
//         error={formErrors.buyerPhone?.[0]}
//       />
//        <Label htmlFor="name">Địa chỉ</Label>
//       <Input
//         name="buyerAddress"
//         placeholder="Enter your address"
//         value={formValues.buyerAddress}
//         onChange={handleChange}
//         error={formErrors.buyerAddress?.[0]}
//       />
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };

// export default AddressForm;
