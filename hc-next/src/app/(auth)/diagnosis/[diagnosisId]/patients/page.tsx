"use client";
import Table from "@/components/Table";
import {
  columns,
  patients as data,
  genOptions as pickOptions,
} from "@/data/DiagnosisPatients";
import { getDiagnosisPatientDetailUrl } from "@/lib/urlBuilder";
import { redirect } from "next/navigation";

export default function Diagnosis() {
  return (
    <div className="p-8 px-12">
      <h1 className="text-4xl font-bold">Pacienti</h1>

      <Table
        {...{
          onRowAction: (row) => {
            redirect(
              getDiagnosisPatientDetailUrl({
                diagnosisId: "C911",
                patientId: String(row),
              }),
            );
          },
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
