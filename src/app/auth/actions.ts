"use server";
import bcrypt from "bcryptjs";
import { LoginSchema, RegisterSchema } from "./schema";
import db from "@/db/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (values: any) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }

    throw error;
  }
};

export const register = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return {
      error: "Email already taken!",
    };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone: "",
      city: "",
      address: "",
    },
  });
  return {
    success: "User successfully created!",
  };
};
