"use client";
import Chat from "@/components/Chat";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Patient() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const diagnosisId = params["diagnosisId"]?.toString() || "";
  const patientId = params["patientId"]?.toString() || "";

  const [messages, setMessages] = useState<any>();

  const mutation = useMutation({
    mutationFn: async (query: string) =>
      await axios.get(
        `http://localhost:5000/diagnosis/${diagnosisId}/patient/${patientId}/chat`,
        {
          params: {
            query,
          },
        },
      ),
    onSuccess(data) {
      setMessages((prev) => [
        ...prev,
        {
          response: data.data.data[0].value,
          refferences: [data.data.data[0]],
        },
      ]);
    },
  });

  // const useChatQueryMutation = useChatQuery();

  function handleNewMessage(query: string) {
    setMessages((prev) => [
      ...prev,
      {
        query,
      },
    ]);
    mutation.mutate(query);
  }

  return (
    <div className="p-8 px-12">
      <Chat {...{ messages, loading: mutation.isPending, handleNewMessage }} />
    </div>
  );
}
