import { User, Order, OrderItem, Product } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & User;
  }
    // interface Session {
    //     user: {
    //         id: string,
    //     } & DefaultSession["user"]
    // }
    interface BuyerDetails {
        buyerName: string;
        buyerEmail: string;
        buyerPhone: string;
        buyerAddress: string;
      }
}

export type OrderWithItems = Order & {
    orderItems: (OrderItem & {
      product: Product;
    })[];
  };