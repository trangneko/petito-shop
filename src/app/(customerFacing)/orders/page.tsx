"use client"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import db from "@/db/db";
  import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Order, OrderItem, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { getOrders } from "./actions";

  interface OrdersTableProps {
    orders: Order & {
      orderItems: (OrderItem & {
        product: Product;
      })[];
    }[];
  }
  
  export default function OrdersPage({ userId }: { userId: string }) {
    // const orders = getOrders(userId);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
      getOrders(userId).then(setOrders);
    }, [userId]);

    return (
      <>
        <div className="flex justify-between items-center gap-4">
          <h1 className="h1">Đơn hàng</h1>
        </div>
        <OrdersTable orders={orders} />
      </>
    );
  }
  
  function OrdersTable({ orders }: { orders: Order[] }) {

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
              <TableCell><img src={order.orderItems[0]?.product?.imagePath || 'default-image-url'} alt="Product" /></TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>{formatCurrency(order.pricePaidInVnd * 1000)}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  