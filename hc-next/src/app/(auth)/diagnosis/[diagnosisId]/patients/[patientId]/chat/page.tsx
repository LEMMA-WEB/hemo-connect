"use client";
import Chat from "@/components/Chat";
import Table from "@/components/Table";
import { columns, descOptions as pickOptions } from "@/data/PatientRecords";
import { useHCQuery } from "@/hooks/use-hc-query";
import { schemaRecordArray } from "@/schemas/backendScheme";
import { error } from "console";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Patient() {
  const params = useParams();
  const diagnosisId = params["diagnosisId"]?.toString() || "";
  const patientId = params["patientId"]?.toString() || "";

  const [messages, setMessages] = useState([
    {
      query: "Jak se máte?",
    },
    {
      response: "dobře",
      refferences: [
        {
          id: 235,
          start: 135,
          end: 145,
        },
      ],
    },
  ]);

  const useChatQueryMutation = useChatQuery();

  function handleNewMessage(query: string) {
    setMessages((prev) => [
      ...prev,
      {
        query,
      },
    ]);

    useChatQueryMutation.mutate({
      query,
      patientId,
      diagnosisId,
      successCb: (response) => {
        setMessages((prev) => [
          ...prev,
          {
            response: response.response,
            refferences: response.refferences,
          },
        ]);
      },
      errorCb: (error) => {
        console.log(error);
      },
    });
  }

  console.log(status);
  if (!data) return null;
  console.log(data);
  return (
    <div className="p-8 px-12">
      <Chat {...{ messages, loading, handle }} />
    </div>
  );
}
