import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import "./globalicon.css";
import Footer from "@/components/Footer";
import SessionProvider from "./SessionProvider";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: 'Petito Shop',
    template: "%s | Petito Shop"
  },
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
        <div className="flex-grow" style={{ minHeight: 'calc(100vh - var(--navbar-height) - var(--footer-height))' }}>
        <SessionProvider>
          {children}
          <Analytics />
        </SessionProvider></div>
      <Footer />
      </body>
    </html>
  );
}
