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
      id: "5641654",
      email: "lekar@fnb.example.cz",
      name: "Lékař",
      image:
        user.image ??
        "https://this-person-does-not-exist.com/img/avatar-gencd0687a5c3beb51eccb7b9afea4f12fa.jpg",
    };
  }

  return { ...session, data: { ...session.data, user: processedUser } };
}
