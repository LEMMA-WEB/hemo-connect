"use client";

import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page({ children }: PropsWithChildren) {
  const session = useSession();

  if (!session.data) redirect("/");

  return (
    <div>
      <div>layout</div>
      <div>{children}</div>
    </div>
  );
}
