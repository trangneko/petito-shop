"use server";

import db from "@/db/db";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { generateProductId } from "@/lib/utils";

const addSchema = z.object({
  shortId: z.string().optional(),
  name: z.string().min(1).max(50),
  description: z.string().min(1),
  priceInJpy: z.coerce.number().int(),
  priceInVnd: z.coerce.number().int(),
  rootPath: z.string(),
  image: z.string().min(1),
});

export async function fetchProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInVnd: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });
  return products;
}

export async function addProduct(prevState: unknown, formData: FormData) {
  const customId = generateProductId();
  const entries = Object.fromEntries(formData.entries());
  entries.shortId = customId;

  const result = addSchema.safeParse(entries);
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const newProduct = await db.product.create({
    data: {
      shortId: customId,
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInJpy: data.priceInJpy,
      priceInVnd: data.priceInVnd,
      rootPath: data.rootPath,
      imagePath: data.image,
    },
  });
  console.log("Product created successfully", newProduct);

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.product.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({
    where: { id },
  });

  if (product == null) return notFound();

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInJpy: data.priceInJpy,
      priceInVnd: data.priceInVnd,
      rootPath: data.rootPath,
      imagePath: data.image,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}
