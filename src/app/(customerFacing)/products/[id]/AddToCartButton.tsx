"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { incrementProductQuantity } from "./actions";

interface AddToCartButton {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId }: AddToCartButton) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => {
        setSuccess(false);
        startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
        })
      }}>Thêm vào giỏ</Button>
      {isPending && <span><Loader2 className="animate-spin"/></span>}
      {!isPending && success && (
        <span>Đã thêm vào giỏ</span>
      )}
    </div>
  );
}
