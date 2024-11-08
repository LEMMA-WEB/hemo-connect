/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Logo } from "@/assets/icons/logo";
import { getDiagnosisUrl } from "@/lib/urlBuilder";
import { UserMenu } from "./user-menu";

type HeaderProps = {
  className?: string;
} & React.HTMLAttributes<HTMLOrSVGElement>;

export function Header({ ...props }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4" {...props}>
      <Link href={getDiagnosisUrl()} className="flex items-center gap-4">
        <Logo />
        <div className="text-3xl font-extrabold tracking-tight">
          HemoConnect
        </div>
      </Link>

      <UserMenu />
    </header>
  );
}
