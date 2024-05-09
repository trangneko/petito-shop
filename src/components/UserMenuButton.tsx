"use client";

import { handleSignOut } from "@/app/api/auth/signout";
import { UserIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className=" text-white">
          {user ? (
            <Image
              src={user?.image || "/noavatar.png"}
              alt="Profile Picture"
              width={40}
              height={40}
              className="w-10 rounded-full"
            />
          ) : (
            <UserIcon />
          )}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem tabIndex={0} className="s-30 mt-3 w-52 shadow">
          {user ? (
            <form
            action={async () => {
              await handleSignOut();
            }}
          >
            <Button type="submit">
              Đăng xuất
            </Button>
            </form>
          ) : (
            <Link href="/api/auth/signin">
            <Button>Đăng nhập</Button>
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
