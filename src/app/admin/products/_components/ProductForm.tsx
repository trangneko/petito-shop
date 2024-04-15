"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct, updateProduct } from "../../_actions/products";

export function ProductForm({ product }: { product?: Product | null }) {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInVnd, setPriceInVnd] = useState<number | any>(
    product?.priceInVnd
  );
  const [priceInJpy, setPriceInJpy] = useState<number | any>(
    product?.priceInJpy
  );

  const isPriceValid = priceInVnd !== undefined || priceInJpy !== undefined;

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Tên</Label>
        <Input
          type={"text"}
          id="name"
          name="name"
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2 flex justify-between">
        <div>
          <Label htmlFor="price">Giá (k đồng)</Label>
          <Input
            type={"number"}
            id="priceInVnd"
            name="priceInVnd"
            required={!priceInJpy}
            value={priceInVnd}
            onChange={(e) => setPriceInVnd(Number(e.target.value) || null)}
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInVnd || 0) * 1000)}
          </div>
          {error.priceInVnd && (
            <div className="text-destructive">{error.priceInVnd}</div>
          )}
        </div>
        <p>hoặc</p>
        <div className="m-0">
          <Label htmlFor="priceInJpy">Giá (yên)</Label>
          <Input
            type={"number"}
            id="priceInJpy"
            name="priceInJpy"
            required={!priceInVnd}
            value={priceInJpy}
            onChange={(e) => setPriceInJpy(Number(e.target.value) || null)}
          />
          <div className="text-muted-foreground">
            {formatCurrency(priceInJpy || 0, "JPY")}
          </div>
          {error.priceInJpy && (
            <div className="text-destructive">{error.priceInJpy}</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Input
          type={"text"}
          id="description"
          name="description"
          defaultValue={product?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rootPath">Link gốc</Label>
        <Input
          type={"text"}
          id="rootPath"
          name="rootPath"
          defaultValue={product?.rootPath || ""}
        />
        {error.rootPath && (
          <div className="text-destructive">{error.rootPath}</div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Ảnh</Label>
        <Input
          type={"text"}
          id="image"
          name="image"
          required={product == null}
        />
        {product != null && (
          <Image
            src={product.imagePath}
            height="400"
            width={"400"}
            alt={product.name}
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Đang lưu..." : "Lưu"}
    </Button>
  );
}
