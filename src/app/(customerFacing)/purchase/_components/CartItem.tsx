import { CartItemsWithProduct } from "@/db/cart";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

interface CartItemProps {
  cartItem: CartItemsWithProduct;
}

export default function CartItem({
  cartItem: { product, quantity },
}: CartItemProps) {
  return (
    <div
      className="cart-item flex items-center gap-4 p-4 border-b border-gray-200"
      key={product.id}
    >
      <div className="image-container">
        <Image
          src={product.imagePath}
          alt={product.name}
          width={100}
          height={100}
          className="rounded-md"
        />
      </div>
      <div className="item-details flex-grow">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-600">
          Price: {formatCurrency(product.priceInVnd * 1000)}
        </p>
        <p className="text-gray-600">Quantity: {quantity}</p>
      </div>
      <div className="item-subtotal">
        <h3 className="text-lg font-bold">Subtotal:</h3>
        <p>{formatCurrency(product.priceInVnd * 1000 * quantity)}</p>
      </div>
    </div>
  );
}
