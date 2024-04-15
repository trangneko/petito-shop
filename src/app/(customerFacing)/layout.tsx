import React from "react";
import Navbar from "./navbar/Navbar";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="container my-6">{children}</div>
    </>
  );
}
