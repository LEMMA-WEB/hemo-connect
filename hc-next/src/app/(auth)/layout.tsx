"use client";

import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/session";
import { Header } from "@/components/layout/header";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { status } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated") {
    return (
      <div className="flex h-screen w-full flex-col overflow-hidden">
        <div className="border-b-1 border-neutral-200">
          <Header />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  redirect("/");
}
