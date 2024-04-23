"use client";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { useState } from "react";

// type ProductCardProps = {
//   id: string;
//   name: string;
//   priceInVnd: number;
//   description: string;
//   imagePath: string;
// };
interface ProductCardProps {
  product: {
    id: string;
    shortId: string | null;
    name: string;
    priceInVnd: number;
    description: string;
    imagePath: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        {imageError ? (
          <div className="placeholder">Placeholder Image</div>
        ) : (
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            onError={handleImageError}
            priority
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {formatCurrency(product.priceInVnd * 1000)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size={"lg"} className="w-full">
          <Link href={`/products/${product.shortId ?? product.id}`}>Xem thêm</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col animate-pulse">
      <div className="w-full h-auto aspect-video bg-gray-300"></div>
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button size={"lg"} disabled className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
