"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreatePaymentLink } from "../actions";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "@/db/cart";
import { BuyerDetails } from "next-auth";

interface PurchaseButtonProps {
  cart: ShoppingCart;
  buyerDetails: BuyerDetails | null;
}

export default function PurchaseButton({ cart, buyerDetails }: PurchaseButtonProps) {
  console.log("buyer details", buyerDetails);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!buyerDetails ||
    (['buyerAddress', 'buyerEmail', 'buyerName', 'buyerPhone'] as (keyof BuyerDetails)[])
      .some(key => !buyerDetails[key]?.length)
  ) {
    return <div>Vui lòng bổ sung thông tin nhận hàng (có thể sửa sau).</div>;
  }
  

  const createAndNavigate = async () => {
    setLoading(true);
    const url = await handleCreatePaymentLink({ cart, ...buyerDetails });
    setLoading(false);
    if (url) {
      router.push(url); // Use the useRouter hook to navigate
    } else {
      alert("Failed to create payment link. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={createAndNavigate} disabled={loading}>
        {loading ? "Đang tải..." : "Xác nhận thanh toán"}
      </Button>
    </div>
  );
}
