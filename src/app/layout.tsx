import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globalicon.css";
import Footer from "@/components/Footer";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Petito Shop",
  description:
    "Petito Shop chuyên mua hộ hàng Nhật, đi pick-up bốc hàng quanh Tokyo ngoài ra có nhận order Taobao nka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      <Footer />
      </body>
    </html>
  );
}
