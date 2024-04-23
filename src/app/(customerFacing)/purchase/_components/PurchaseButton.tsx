"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleCreatePaymentLink } from "../actions";
import { Button } from "@/components/ui/button";

export default function PurchaseButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createAndNavigate = async () => {
    setLoading(true);
    const url = await handleCreatePaymentLink();
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
