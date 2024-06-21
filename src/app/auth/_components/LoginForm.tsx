"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "../schema";
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
import { login } from "../actions";
import { useEffect, useState } from "react";
import { signIn } from "@/auth";
import GoogleLoginButton from "./GoogleLoginButton";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // // Capture error from URL query parameters
  // useEffect(() => {
  //   if (router.query.error) {
  //     setError(getErrorMessage(router.query.error as string));
  //   }
  // }, [router.query.error]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsPending(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError(getErrorMessage(result.error));
      }
    } catch (e) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    }

    setIsPending(false);
  };

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "OAuthAccountNotLinked":
        return "Một tài khoản khác đã tồn tại với cùng địa chỉ email nhưng phương thức đăng nhập khác. Vui lòng đăng nhập bằng phương thức đã liên kết.";
      case "CredentialsSignin":
        return "Thông tin đăng nhập không chính xác. Vui lòng thử lại.";
      default:
        return "Đã xảy ra lỗi. Vui lòng thử lại.";
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Đăng nhập</CardTitle>
        <CardDescription>Chào mừng bạn đã trở lại!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-4">
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
              Đăng nhập
            </Button>
          </form>
        </Form>
        <GoogleLoginButton setError={setError} />
      </CardContent>
      <CardFooter className="flex justify-between flex-col">
        <Link className="text-xs" href="/auth/register">
          Chưa có tài khoản? Đăng ký tại đây.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
