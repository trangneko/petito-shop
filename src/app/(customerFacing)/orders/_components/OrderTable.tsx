
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust import path
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters"; // Adjust import path
import { OrderWithItems } from "../../../../../@types/type";

interface OrdersTableProps {
  orders: OrderWithItems[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>STT</TableHead>
          <TableHead>Ảnh đại diện</TableHead>
          <TableHead>Mã đơn hàng</TableHead>
          <TableHead>Thành tiền</TableHead>
          <TableHead>Ngày tạo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={order.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Image
                src={order.orderItems[0]?.product?.imagePath || "/default-image-url"}
                alt="Product"
                width={50}
                height={50}
              />
            </TableCell>
            <TableCell>{order.id}</TableCell>
            <TableCell>{formatCurrency(order.pricePaidInVnd * 1000)}</TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
