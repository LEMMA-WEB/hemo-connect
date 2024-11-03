import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type AcceptObject =
  | Partial<Record<string, string | null | undefined>>
  | Partial<Record<string, string | null | undefined>>[];

type UseHCQueryProps<T extends AcceptObject> = {
  key: string | string[];
  url: string;
  schema: Zod.Schema<T>;
};

export function useHCQuery<T extends AcceptObject>({
  key,
  url,
  schema,
}: UseHCQueryProps<T>) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axios(url);

      const data = response.data;
      const parsedData = schema.parse(data);

      return parsedData;
    },
  });
}
