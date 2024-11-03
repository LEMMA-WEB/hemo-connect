import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseHCQueryProps<
  T extends Partial<Record<string, string | null | undefined>>,
> = {
  key: string | string[];
  url: string;
  schema: Zod.Schema<T>;
};

export function useHCQuery<
  T extends Partial<Record<string, string | null | undefined>>,
>({ key, url, schema }: UseHCQueryProps<T>) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axios(url);

      const data = response.data;
      const parsedData = schema.safeParse(data);

      if (parsedData.success) {
        return parsedData.data;
      }

      return null;
    },
  });
}
