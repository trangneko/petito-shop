import { User } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    // interface Session {
    //     user: {
    //         id: string,
    //     } & DefaultSession["user"]
    // }

    interface Session {
        user: User; // Directly use your User model
    }
    interface BuyerDetails {
        buyerName: string;
        buyerEmail: string;
        buyerPhone: string;
        buyerAddress: string;
      }
}

// Define an interface for your product structure
interface Product {
    id: string;
    name: string;
    priceInVnd: number;
    isAvailableForPurchase: boolean;
    _count: {
        orders: number;
    };
}
