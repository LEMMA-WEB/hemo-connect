"use client";

import { useSession } from "next-auth/react";
import { Logo } from "@/assets/icons/logo";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { LinkButton } from "@/components/ui/link-button";
import { getSignInUrl, getSignOutUrl, getDiagnosisUrl } from "@/lib/urlBuilder";

export default function Home() {
  const { data: session } = useSession();

  return (
    <BackgroundBeamsWithCollision className="">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex items-center justify-around">
          <Logo className="h-32 w-32" />
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            HemoConnect
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl">
              {session && (
                <span>
                  Přihlášen jako{" "}
                  {session.user?.name ?? session.user.email?.split("@")[0]}
                </span>
              )}
            </p>
            {session ? (
              <div className="flex gap-4">
                <LinkButton href={getDiagnosisUrl()}>Diagnóza</LinkButton>
                <LinkButton href={getSignOutUrl()}>Odhlásit se</LinkButton>
              </div>
            ) : (
              <LinkButton href={getSignInUrl()}>Přihlásit se</LinkButton>
            )}
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
