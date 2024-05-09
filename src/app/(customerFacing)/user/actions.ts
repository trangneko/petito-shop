"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const phoneMess = "Số điện thoại không đúng định dạng";

const addSchema = z.object({
  username: z.string().optional(),
  name: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9+]{10,11}$/, { message: phoneMess }),
  image: z.string().optional(),
  city: z.string().min(1).max(20),
  address: z.string().min(1),
});

export async function newUser(prevState: unknown, formData: FormData) {
  //   const customId = generateuserId();
  const entries = Object.fromEntries(formData.entries());
  //   entries.shortId = customId;

  const result = addSchema.safeParse(entries);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const newUser = await db.user.create({
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      emailVerified: null,
      phone: data.phone,
      image: data.image,
      city: data.city,
      address: data.address,
    },
  });
  console.log("User created successfully", newUser);

  revalidatePath("/user");
  redirect("/user");
}

export async function updateUser(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const user = await db.user.findUnique({
    where: { id },
  });

  if (user == null) return notFound();

  await db.user.update({
    where: { id },
    data: {
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: data.image,
      city: data.city,
      address: data.address,
    },
  });

  revalidatePath("/user");
  redirect("/user");
}

interface UserUpdateData {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export async function updateUserQuick(id: string, data: UserUpdateData) {
  const result = addSchema.safeParse(data);
  if (result.success === false) {
    console.error("Validation failed", result.error.formErrors);
    return result.error.formErrors.fieldErrors;
  }

  try {
    const user = await db.user.findUnique({ where: { id } });
    if (user == null) {
      console.error("User not found");
      return notFound();
    }
    await db.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        address: data.address,
        isGuest: false,
      },
    });
    console.log("User updated successfully");
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}
