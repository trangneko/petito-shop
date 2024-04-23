"use client";
import { useSearchParams } from "next/navigation";

const ThankYouPage = () => {
  const searchParams = useSearchParams(); // useSearchParams returns a tuple
  // const resCode = searchParams.get('vnp_ResponseCode');
  // const orderId = searchParams.get('vnp_TxnRef');

  return (
    <div>
      <h1>Thank You for Your Order!</h1>

      <p>Your order has been processed successfully.</p>
    </div>
  );
};

export default ThankYouPage;
