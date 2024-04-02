"use client";

import Horizontalnav from "@/components/Dashboard/Horizontalnav";
import Verticlnav from "@/components/Dashboard/Verticalnav";
import { useSession } from "next-auth/react";

export default function Navlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex flex-col">
        <div className="lg:flex hidden">
          <Verticlnav />
        </div>

        <div className="flex lg:hidden">
          <Horizontalnav />
        </div>

        <div className="lg:ml-[260px]">{children}</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div>{children}</div>;
  }
}
