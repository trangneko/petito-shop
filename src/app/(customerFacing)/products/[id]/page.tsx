import db from "@/db/db";
import { cache } from "react";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  params: {
    id: string;
    shortId: string;
  };
}

const getProduct = cache(async (id: string) => {
  let product;
  try {
    product = await db.product.findUnique({ where: { id } });
  } catch(error) {
    // If the first query fails, attempt to query by shortId
    product = await db.product.findFirst({ where: { shortId: id } });
  }
  if (!product) notFound();
  return product;
});


export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.imagePath }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col justify-center  items-center lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imagePath}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="h1">{product.name}</h1>
        <p className="text-4xl text-red-600">
          {formatCurrency(product.priceInVnd*1000) }
        </p>
        <p className="py-6">{product.description}</p>
        {product.rootPath ? <p>Link tham khảo: {product.rootPath}</p> : null}
        <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
      </div>
    </div>
  );
}
