import { env } from "@/lib/env";
import PayOS from "@payos/node";

const clientID = "0d26a8a4-55ad-4972-a7cf-7663fb358ced";
const apiKey = "8909f39b-a9b1-4ccc-ad2e-265dc4ba52b7";
const checksumKey = "b81e014048d0fc5986442aabc9aa9cf1ab0e7f9192bd8579c25cc78c08028088";

const payOS = new PayOS(
  clientID,
  apiKey,
  checksumKey
);

export const handleCreatePaymentLink = async () => {
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: 12000,
    description: "Thanh toan don hang",
    items: [
      {
        name: "Mi tom hao hao",
        quantity: 1,
        price: 2000,
      },
      {
        name: "Miku nend",
        quantity: 1,
        price: 10000,
      },
    ],
    cancelUrl: "http://localhost:3000/purchase/cancel",
    returnUrl: "http://localhost:3000/purchase/success",
  };

  try {
    const paymentLinkRes = await payOS.createPaymentLink(body);
    console.log("Payment link created:", paymentLinkRes);
    return paymentLinkRes.checkoutUrl;
  } catch (error) {
    console.error("Error creating payment link:", error);
    return null;
  }
};
