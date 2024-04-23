import PaginationBar from "@/components/PaginationBar";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Metadata } from "next";
import { Suspense } from "react";

interface HomeProps {
  searchParams: { page: string };
}
interface ProductSuspenseProps {
  currentPage: number;
  pageSize: number;
}
const getProducts = cache(
  (currentPage, pageSize) => {
    return db.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: { id: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  },
  ["/products", "getProducts"]
);

export const metadata: Metadata = {
  title: "Sản Phẩm",
  description:
    "Những mặt hàng có sẵn tại Petito. Petito Shop chuyên mua hộ hàng Nhật, đi pick-up bốc hàng quanh Tokyo ngoài ra có nhận order Taobao nka",
};

export default async function ProductPage({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const totalItemCount = await db.product.count();
  const totalPages = Math.ceil(totalItemCount / pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={Array(6).fill(<ProductCardSkeleton />)}>
          <ProductSuspense currentPage={currentPage} pageSize={pageSize} />
        </Suspense>
      </div>
      <div className="my-8">
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}

async function ProductSuspense({
  currentPage,
  pageSize,
}: ProductSuspenseProps) {
  const products = await getProducts(currentPage, pageSize);
  return products.map((product) => (
    // <ProductCard key={product.id} {...product} />
    <ProductCard key={product.id} product={product} />
  ));
}
