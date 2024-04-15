"use client";

import { CartItemsWithProduct } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { setProductQuantity } from "./actions";

interface CartEntryProps {
  cartItem: CartItemsWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    quantityOptions.push(<option value={i}>{i}</option>);
  }

  return (
      <div className="flex flex-wrap items-center gap-3 my-6">
        <Image
          src={product.imagePath}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-lg"
        />
        <div>
          <div>
            <Link href={"/products/" + product.id} className="font-bold">
              {product.name}
            </Link>
          </div>
          <div>Đơn giá: {formatCurrency(product.priceInVnd * 1000)}</div>

          <div className="my-1 flex items-center gap-2">
            Số lượng:
            <select
              className="w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Xóa khỏi giỏ)</option>
              {quantityOptions}
            </select>
          </div>

          <div className="flex items-center gap-3">
            Thành tiền: {formatCurrency(product.priceInVnd * 1000 * quantity)}
            {isPending && (
              <span className="animate-spin">
                <Loader2Icon />
              </span>
            )}
          </div>
        </div>
      </div>
 
  );
}
