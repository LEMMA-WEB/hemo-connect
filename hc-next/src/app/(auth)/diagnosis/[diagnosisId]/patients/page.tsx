"use client";
import Table from "@/components/Table";
import { columns, genOptions as pickOptions } from "@/data/DiagnosisPatients";
import { useHCQuery } from "@/hooks/use-hc-query";
import {
  SchemaPatientArray,
  schemaPatientArray,
} from "@/schemas/backendScheme";

import { useParams } from "next/navigation";
import { getDiagnosisPatientDetailUrl } from "@/lib/urlBuilder";
import { redirect } from "next/navigation";
import { Spinner } from "@nextui-org/react";

export default function Diagnosis() {
  const params = useParams();
  const diagnosisId = params["diagnosisId"]?.toString() || "";

  const { data, status } = useHCQuery({
    url: `http://localhost:5000/diagnosis/${diagnosisId}/patient`,
    key: [diagnosisId],
    schema: schemaPatientArray,
  });
  if (!data) {
    return (
      <div className="flex w-full justify-center p-8">
        <Spinner color="danger" />
      </div>
    );
  }
  const dataNew = data as SchemaPatientArray;
  return (
    <div className="p-8 px-12">
      <h1 className="text-4xl font-bold">Pacienti</h1>
      <Table
        {...{
          columns,
          data: dataNew,
          pickOptions,
          initialVisibleColumns: [
            "ic_pac",
            "first_dat",
            "last_dat",
            "text_dg",
            "gen_mark",
            "actions",
          ],
          pickFilterField: "gen_mark",
          idColumn: "ic_pac",
          sortField: "last_dat",
          searchField: "text_dg",
        }}
      />
    </div>
  );
}
