import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type UseHCQueryProps = {
  key: string | string[];
  url: string;
  schema: Zod.Schema<any>;
};

export function useHCQuery({ key, url, schema }: UseHCQueryProps) {
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
