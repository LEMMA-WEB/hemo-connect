import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import SendGridProvider from "next-auth/providers/sendgrid";
import tailwindConfig from "tailwind.config";
import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    SendGridProvider({
      from: env.AUTH_EMAIL_ADDRESS,
      name: "Email",
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#cc0000", // Hex color code
    buttonText: "#fff", // Hex color code
    logo: "/assets/images/logo_long.png", // Absolute URL to image
  },
} satisfies NextAuthConfig;
