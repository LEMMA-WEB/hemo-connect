"use client";
import Table from "@/components/Table";
import { columns, genOptions as pickOptions } from "@/data/DiagnosisPatients";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {  useParams } from "next/navigation";

export default function Diagnosis() {
  const params = useParams();
  const diagnosisId = params["diagnosisId"]?.toString() || "";

  const { data, status } = useQuery({
    queryKey: [diagnosisId],
    queryFn: async () =>
      await axios.get(`http://localhost:5000/diagnosis/${diagnosisId}`),
  });
  if (!data) {
    return <p>Error during fetching the data or data does not exists.</p>;
  }
  
  return (
    <div className="p-8 px-12">
      <h1 className="text-4xl font-bold">Pacienti</h1>

      <Table
        {...{
          redirectUrl:
          columns,
          data,
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
