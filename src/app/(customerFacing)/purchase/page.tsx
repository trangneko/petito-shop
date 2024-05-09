import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getCart, ShoppingCart } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import { User } from "@prisma/client";
import Link from "next/link";
import AddressForm from "./_components/AddressForm";
import CartItem from "./_components/CartItem";
import PurchaseButton from "./_components/PurchaseButton";

export const metadata = {
  title: "Thanh toán",
};

function prepareBuyerDetails(buyer: User) {
  if (!buyer) {
    return null;
  }

  const formatAddressPart = (part: string | null) => part ? part : '';

  // Safely construct the address to avoid "null, null" or similar outcomes
  const addressParts = [buyer.address, buyer.city].map(formatAddressPart).filter(part => part !== '');
  const formattedAddress = addressParts.join(', ');

  const buyerDetails = {
    buyerName: buyer.name ?? '',
    buyerEmail: buyer.email ?? '',
    buyerPhone: buyer.phone ?? '',
    buyerAddress: formattedAddress || '',  // Use the formatted address or default to an empty string
  };

  return buyerDetails;
}

async function PurchasePage() {
  const session = await auth();
  const user = session?.user;

  if (user != null) {
    if (user && user.name && user.email && user.phone && user.address) {
      user.isGuest = false;
    } else {
      user.isGuest = true;
    }
    const buyerDetails = prepareBuyerDetails(user);
    const cart: ShoppingCart | null = await getCart();

    return (
      <div className="container mx-auto">
        <h1 className="h1 text-center">Xác nhận thông tin thanh toán</h1>
        <div className="md: flex gap-12">
          <div>
            <div className="my-4">
              {cart?.items.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))}
            </div>

            {!cart ? (
              <p>Ủa bạn đã có gì trong giỏ đâu mà thanh toán :D.</p>
            ) : (
              <div className=" text-right">
                <p className="text-lg font-bold">
                  Total: {formatCurrency(cart?.subtotal!)}
                </p>
                <p className="text-sm">Chưa gồm phí ship nội địa VN nếu có.</p>
              </div>
            )}
          </div>

          {user.isGuest ? <AddressForm initialData={user} /> : null}

        </div>
        <div className="flex justify-end my-6">
          <PurchaseButton cart={cart!} buyerDetails={buyerDetails} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center">
        <h3 className="mb-5 text-xl">Bạn cần đăng nhập để tiếp tục.</h3>
        <Link href="/api/auth/signin">
          <Button>Đăng nhập</Button>
        </Link>
      </div>
    );
  }
}

export default PurchasePage;
