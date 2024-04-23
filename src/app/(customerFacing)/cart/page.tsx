import { Button } from "@/components/ui/button";
import { getCart } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import Link from "next/link";
import { setProductQuantity } from "./actions";
import CartEntry from "./CartEntry";

export const metadata = {
  title: "Giỏ hàng",
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
      {!cart?.items.length ? (
        <p className="text-center">Giỏ của bạn đang trống.</p>
      ) : (
        <div className="flex flex-col items-end">
          <p className="font-bold">
            Tổng cộng: {formatCurrency(cart?.subtotal! * 1000 || 0)}
          </p>
          <p className="mb-3">
            Lưu ý: số tiền chưa bao gồm phí ship nội địa VN (nếu có), phí cân
            (với đơn order từ Nhật)
          </p>
          <Button>
            <Link href="/purchase">Thanh toán</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
