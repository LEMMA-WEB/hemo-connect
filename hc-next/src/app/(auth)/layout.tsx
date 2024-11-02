"use client";

import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { status } = useSession();

  if (status === "authenticated") return children;

  if (status === "loading") return null;

  redirect("/");
}
