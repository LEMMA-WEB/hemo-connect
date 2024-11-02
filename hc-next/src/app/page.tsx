 "use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "~/assets/logo";
import { BackgroundBeamsWithCollision } from "~/components/ui/background-beams-with-collision";

export default function Home() {
  

  const { data: session } = useSession();

  return (
    <BackgroundBeamsWithCollision className="">
    
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex items-center justify-around">
          <Logo className="w-32 h-32" />
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

            <Button color="primary" size="lg" className="text-xl px-8">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className=""
              >
                {session ? "Odhlásit se" : "Přihlásit se"}
              </Link>
            </Button>
          </div>
        </div>
      </div>

    </BackgroundBeamsWithCollision>
  );
}

