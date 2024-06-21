"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "../schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { register } from "../actions";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      const data = await register(values);
      if (data && data.success) {
        setSuccess(data.success);
        setTimeout(() => redirect("/auth/login"), 2000);
      }
      if (data && data.error) setError(data.error);
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Đăng ký</CardTitle>
        <CardDescription>
          Quản lý đơn hàng, lưu địa chỉ, nhận ưu đãi nhiều hơn khi trở thành
          thành viên nhà Pơ.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {success && (
              <div className="bg-green-500 text-white px-4 py-2 rounded-md">
                {success}
              </div>
            )}
            {error && (
              <div className="bg-red-500  text-white px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            <Button
              disabled={isPending}
              type="submit"
              size="lg"
              className="w-full"
            >
              Đăng ký
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between flex-col">
        <Link className="text-xs" href="/auth/login">
          Đã có tài khoản? Đăng nhập tại đây.
        </Link>
      </CardFooter>
    </Card>
  );
};
