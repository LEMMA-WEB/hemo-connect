"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { type PropsWithChildren } from "react";
import { TRPCReactProvider, TanstackQueryProvider } from "~/providers";

export function Providers({ children }: PropsWithChildren) {
  return (
    <TRPCReactProvider>
      <TanstackQueryProvider>
        <SessionProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
      </TanstackQueryProvider>
    </TRPCReactProvider>
  );
}
