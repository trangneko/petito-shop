import { getCart } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import AddressForm from "./_components/AddressForm";
import CartItem from "./_components/CartItem";
import PurchaseButton from "./_components/PurchaseButton";

export const metadata = {
  title: "Thanh toán",
};

export default async function PurchasePage() {
  const cart = await getCart();

  return (
    <div className="container mx-auto">
      <h1 className="h1 text-center">Xác nhận thông tin thanh toán</h1>
      <div className="md: flex gap-12">
        <AddressForm />

        <div>
          <div className="my-4">
            {cart?.items.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>

          {!cart?.items.length ? (
            <p>Ủa bạn đã có gì trong giỏ đâu mà thanh toán :D.</p>
          ) : (
            <div className=" text-right">
              <p className="text-lg font-bold">
                Total: {formatCurrency(cart?.subtotal! * 1000)}
              </p>
              <p className="text-sm">Chưa gồm phí ship nội địa VN nếu có.</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end my-6">
      <PurchaseButton /></div>
    </div>
  );
}
