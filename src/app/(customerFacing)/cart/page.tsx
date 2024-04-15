import { Button } from "@/components/ui/button";
import { getCart } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import { setProductQuantity } from "./actions";
import CartEntry from "./CartEntry";

export const metadata = {
  title: "Petito Shop | Giỏ hàng",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Giỏ hàng</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Giỏ của bạn đang trống.</p>}
      <div className="flex flex-col items-end">
        <p className="mb-3 font-bold">
          Tổng cộng: {formatCurrency(cart?.subtotal || 0)}
        </p>
        <Button>Thanh toán</Button>
      </div>
    </div>
  );
}
