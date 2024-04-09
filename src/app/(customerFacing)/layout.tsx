import { Nav, NavLink } from "@/components/Nav";
import React from "react";

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/">Trang chủ</NavLink>
        <NavLink href="/products">Sản phẩm</NavLink>
        <NavLink href="/orders">Đơn đã đặt</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}
