"use client";
import { useEffect, useState } from "react";
import { OrderWithItems } from "../../../../@types/type";
import { getOrders } from "./actions";
import { OrdersTable } from "./_components/OrderTable";

// interface OrdersTableProps {
//   orders: Order & {
//     orderItems: (OrderItem & {
//       product: Product;
//     })[];
//   }[];
// }

interface OrdersPageProps {
  userId: string;
}

export default function OrdersPage({ userId }: OrdersPageProps) {
  // const orders = getOrders(userId);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders(userId)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);


  if (loading) {
    return <div>Loading...</div>; // Optionally, add a loading state
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center gap-4">
        <h1 className="h1">Đơn hàng</h1>
      </div>
      {orders.length > 0 ? (
        <OrdersTable orders={orders} />
      ) : (
        <div className="text-center mt-4">Bạn chưa đặt đơn nào!</div>
      )}
    </div>
  );
}

// interface OrdersTableProps {
//   orders: OrderWithItems[];
// }

// function OrdersTable({ orders }: OrdersTableProps) {

//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>STT</TableHead>
//           <TableHead>Ảnh đại diện</TableHead>
//           <TableHead>Mã đơn hàng</TableHead>
//           <TableHead>Thành tiền</TableHead>
//           <TableHead>Ngày tạo</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {orders.map((order, index) => (
//           <TableRow key={order.id}>
//             <TableCell>{index + 1}</TableCell>
//             {/* <TableCell><Image src={order.orderItems[0]?.product?.imagePath || 'default-image-url'} alt="Product" /></TableCell> */}
//             <TableCell>
//             <Image
//               src={order.orderItems[0]?.product?.imagePath || "/default-image-url"} // Ensure a fallback URL
//               alt="Product"
//               width={50}
//               height={50} // Specify width and height
//             />
//             </TableCell>
//             <TableCell>{order.id}</TableCell>
//             <TableCell>{formatCurrency(order.pricePaidInVnd * 1000)}</TableCell>
//             <TableCell>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
