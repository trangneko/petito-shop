import db from "@/db/db";
import { notFound } from "next/navigation";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const getProduct = async (id: string) => {
    let product;
    try {
      product = await db.product.findUnique({ where: { id } });
    } catch (error) {
      // If the first query fails, attempt to query by shortId
      product = await db.product.findFirst({ where: { shortId: id } });
    }
    if (!product) notFound();
    return product;
  };
  const product = await getProduct(id);

  return (
    <>
      <PageHeader>Sửa sản phẩm</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
