"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function TmpContent() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          HemoConnect
        </h1>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && (
                <span>
                  Logged in as{" "}
                  {session.user?.name ?? session.user.email?.split("@")[0]}
                </span>
              )}
            </p>
            <Button color="primary" size="lg" className="text-2xl p-8">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className=""
              >
                {session ? "Sign out" : "Přiihlásit se"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
