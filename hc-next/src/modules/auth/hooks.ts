"use client";

import { useQuery } from "@tanstack/react-query";
import { auth } from "~/server/auth";

export function useSession() {
  const query = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => await auth(),
  });

  if (!query.data) return null;

  return query.data;
}
