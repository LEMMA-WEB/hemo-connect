import { useSession as _useSession } from "next-auth/react";

type SessionUser = {
  id: string;
  name: string;
  email?: string | null;
  image: string;
} | null;

export function useSession() {
  const session = _useSession();

  let processedUser: SessionUser = null;

  if (session?.data?.user) {
    const user = session?.data?.user;
    processedUser = {
      ...user,
      name: user.name ?? user.email?.split("@")[0] ?? "Lékař",
      // TODO: Put a placeholder img
      image: user.image ?? "https://cataas.com/cat?width=100&height=100",
    };
  }

  return { ...session, data: { ...session.data, user: processedUser } };
}
