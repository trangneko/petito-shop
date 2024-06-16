import db from "@/db/db";

export async function getOrders(userId: string) {
  return await db.order.findMany({
    where: { userId: userId },
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