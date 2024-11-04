"use client";
import Chat from "@/components/Chat";
import { sleep } from "@/lib/sleep";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Patient() {
  const [messages, setMessages] = useState<any>([]);

  const mutation = useMutation({
    mutationFn: async (query: string) => {
      await sleep(1000);
      return {
        data: {
          data: [
            {
              id: "25965488",
              sentence:
                "7.12.22 odběr prognostikcých faktorů, Rai OA            flow 7.12.23 typický fenotyp B CLL            mutace TP 53 negativní            IGVH 91,32% mutovaný            cytogenetika zatím není",
              sentence_from_start: 123,
              sentence_length: 120,
              value: "Rai OA",
            },
          ],
          original: [
            {
              amb_zaz_text:
                "... Rai OA            flow 7.12.23 typický fenotyp B CLL ...",
              cas_zad: "12:33:00",
              confidence: ".14370739749703534404",
              dat_zad: "2023-01-18",
              dg_kod: "",
              i_dg_kod: "C911 ",
              i_text_dg:
                "Chronická lymfocytická leukemie z B-buněk                   ",
              ic_amb_karta: "6502779",
              ic_amb_zad: "25965488",
              ic_pac: "87049",
              poz_text: "",
              prac_od: "41742",
              text_dg:
                "kontrola                                                    ",
            },
          ],
        },
      };
    },
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
