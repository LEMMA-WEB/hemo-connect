"use client";
import { SessionProvider } from "next-auth/react";
import { type PropsWithChildren } from "react";
import { TanstackQueryProvider, TRPCReactProvider } from "~/providers";

export function Providers({ children }: PropsWithChildren) {
  return (
    <TRPCReactProvider>
      <TanstackQueryProvider>
        <SessionProvider>{children}</SessionProvider>
      </TanstackQueryProvider>
    </TRPCReactProvider>
  );
}
