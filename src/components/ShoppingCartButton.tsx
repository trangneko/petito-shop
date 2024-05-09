"use client"

import { ShoppingCart } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import { Badge, ShoppingCartIcon } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropDown() {
    const elem = document.activeElement as HTMLElement
    if (elem) {
      elem.blur();
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <ShoppingCartIcon />
        <span className=" text-white">{cart?.size || 0}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Card>
          <CardHeader>
            <CardTitle>{cart?.size || 0} sản phẩm</CardTitle>
            <CardDescription>
              Thành tiền: {formatCurrency(cart?.subtotal || 0)}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/cart" onClick={closeDropDown}>
              <Button className="w-full" >Xem giỏ hàng</Button>
            </Link>
          </CardFooter>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
