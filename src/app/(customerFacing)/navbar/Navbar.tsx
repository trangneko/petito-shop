import { redirect } from "next/navigation";
import { Nav, NavLink } from "@/components/Nav";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCart } from "@/db/cart";
import UserMenuButton from "@/components/UserMenuButton";
import { auth } from "@/auth";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import  getServerSession from "next-auth";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  // const session = await getServerSession(authOptions);
  const session = await auth();
  const cart = await getCart();

  return (
    <Nav>
      <Image src={"/logo.png"} alt={"Petito Logo"} width={100} height={50}/>

      <div>
        <NavLink href="/">Trang chủ</NavLink>
        <NavLink href="/products">Sản phẩm</NavLink>
        <NavLink href="/orders">Đơn đã đặt</NavLink>
      </div>

      <div className="flex gap-4">
        <form action={searchProducts} className="flex items-center">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              name="searchQuery"
              placeholder="Tìm sản phẩm..."
            />
            <Button type="submit"><SearchIcon/></Button>
          </div>
        </form>

        <ShoppingCartButton cart={cart} />
        <UserMenuButton session={session} />
      </div>
    </Nav>
  );
}
