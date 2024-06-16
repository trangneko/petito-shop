import db from "@/db/db";
import { OrderWithItems } from "../../../../@types/type";

export async function getOrders(userId: string): Promise<OrderWithItems[]> {
  return await db.order.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });
}