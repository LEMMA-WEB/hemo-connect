/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schemaAiRecord } from "@/schemas/backendScheme";
import axios from "axios";

const chatQuery = async ({ query, patientId, diagnosisId }) => {
  const { data: response } = await axios.post(
    `http://localhost:5000/diagnosis/${diagnosisId}/patient/${patientId}/chat`,
    {
      params: {
        query,
      },
    },
  );
  return schemaAiRecord.parse(response);
};

export const useChatQuery = () => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults(["chat-query"], {
    mutationFn: (data) => chatQuery(data),
    onMutate: async (variables) => {
      const { successCb, errorCb } = variables;
      return { successCb, errorCb };
    },
    onSuccess: (result, variables, context) => {
      if (context?.successCb) {
        context?.successCb(result);
      }
    },
    onError: (error, variables, context) => {
      if (context?.errorCb) {
        context.errorCb(error);
      }
    },
  });
  return useMutation(["chat-query"]);
};
