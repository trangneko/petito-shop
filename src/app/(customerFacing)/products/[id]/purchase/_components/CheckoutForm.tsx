"use client";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";

type CheckoutFormProps = {
  product: Product;
  qrCodeURL: string;
};

export function CheckoutForm({ product, qrCodeURL }: CheckoutFormProps) {
  return (
    <div>
      <h1 className=" text-5xl font-bold">Thanh toán đơn hàng #{product.id}</h1>
      <div className="flex justify-between gap-6 mt-6">
        <div className="flex justify-between items-center w-full h-28">
          <Image
            src={product.imagePath}
            alt={product.name}
            width={100}
            height={100}
            style={{objectFit:"contain"}}
          />
          <div className="text-xl font-bold">
            <h2>{product.name}</h2>
            <h2>{formatCurrency(product.priceInVnd * 1000)}</h2>
          </div>
        </div>
        {qrCodeURL && (
          <Image
            unoptimized
            src={qrCodeURL}
            alt={product.name}
            width="500"
            height="500"
          />
        )}
      </div>
    </div>
  );
}
