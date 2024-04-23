import db from "@/db/db";
import { notFound } from "next/navigation";
import { VietQR } from "./action";
import { CheckoutForm } from "./_components/CheckoutForm";

const vietQR = new VietQR({
  clientID: process.env.VIETQR_CLIENT_ID,
  apiKey: process.env.VIETQR_API_KEY,
});

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({
    where: { id },
  });

  if (product == null) return notFound();

  const amount = product.priceInVnd * 1000;
  const memo = `Purchase ${product.id}`;

  const qrCodeData = await vietQR.genQRCodeBase64({
    bank: "970423",
    accountName: "NGUYEN MINH TRANG",
    accountNumber: "02933557101",
    amount: `${amount}`,
    memo: memo,
    template: "print",
  });

  const qrCodeValue = qrCodeData.data.qrDataURL;

  if (qrCodeData.code !== "00") throw new Error("Failed to generate QR code");

  return <CheckoutForm product={product} qrCodeURL={qrCodeValue} />;
}