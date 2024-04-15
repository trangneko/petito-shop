import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
        } & DefaultSession["user"]
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
