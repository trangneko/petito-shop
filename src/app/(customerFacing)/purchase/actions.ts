"use server";
import { ShoppingCart } from "@/db/cart";
import { env } from "@/lib/env";
import PayOS from "@payos/node";

const clientID = env.PAYOS_CLIENT_ID;
const apiKey = env.PAYOS_API_KEY;
const checksumKey = env.PAYOS_CHECKSUM_KEY;
const host = env.NEXTAUTH_URL;

const payOS = new PayOS(clientID, apiKey, checksumKey);

interface PaymentLinkData {
  cart: ShoppingCart;
  buyerName: string | undefined;
  buyerEmail: string | undefined;
  buyerPhone: string | undefined;
  buyerAddress: string;
}

export const handleCreatePaymentLink = async ({
  cart,
  buyerName,
  buyerEmail,
  buyerPhone,
  buyerAddress,
}: PaymentLinkData) => {
  const items = cart.items.map((item) => ({
    shortId: item.product.shortId,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.priceInVnd*1000,
  }));

  const totalAmount = cart.subtotal;

  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: totalAmount,
    description: `${buyerName} Thanh toan`,
    buyerName,
    buyerEmail,
    buyerPhone,
    buyerAddress,
    items: items,
    cancelUrl: `${host}/purchase/cancel`,
    returnUrl: `${host}/purchase/success`,
  };

  console.log("body sent: ", body);

  try {
    const paymentLinkRes = await payOS.createPaymentLink(body);
    console.log("Payment link created:", paymentLinkRes);
    return paymentLinkRes.checkoutUrl;
  } catch (error) {
    console.error("Error creating payment link:", error);
    return null;
  }
};