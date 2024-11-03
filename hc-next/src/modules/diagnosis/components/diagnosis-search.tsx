"use client";

import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { LiaSearchSolid } from "react-icons/lia";
import { diagnosisList } from "../const/data";
import { redirect } from "next/navigation";
import { getDiagnosisPatientsUrl } from "@/lib/urlBuilder";

export function DiagnosisSearch() {
  const suggestions = [
    diagnosisList[0],
    diagnosisList[7],
    diagnosisList[3],
  ].filter((x) => !!x);

  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        placeholder="Vyhledejte diagnozu"
        defaultItems={diagnosisList.map((item) => ({
          ...item,
          label: `[${item.uniqId}] ${item.label}`,
        }))}
        size="lg"
        disableSelectorIconRotation
        selectorIcon={<LiaSearchSolid />}
        onSelectionChange={(key) => {
          if (!key) return;

          redirect(getDiagnosisPatientsUrl(key));
        }}
      >
        {(item) => (
          <AutocompleteItem
            key={item.uniqId}
            // startContent={`[${item.uniqId}]`}
            endContent={
              <span className="text-default-400">
                ({item.patientsCount} pacientů)
              </span>
            }
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>

      <div className="flex max-w-96 flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.uniqId}
            variant="ghost"
            color="primary"
            radius="lg"
            className="justify-start overflow-hidden truncate"
            onClick={() => redirect(getDiagnosisPatientsUrl(suggestion.id))}
          >
            [{suggestion.uniqId}] {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
