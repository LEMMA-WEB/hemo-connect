"use client";
import Table from "@/components/Table";
import {
  columns,
  records,
  descOptions as pickOptions,
} from "@/data/PatientRecords";
import { getDiagnosisPatientRecordDetailUrl } from "@/lib/urlBuilder";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

export default function Patient() {
  const params = useParams();
  const diagnosisId = params["diagnosisId"]?.toString() || "";
  const patientId = params["patientId"]?.toString() || "";
  const { data, status } = useQuery({
    queryKey: [diagnosisId, patientId],
    queryFn: async () =>
      await axios.get(
        `http://localhost:5000/diagnosis/${diagnosisId}/patient/${patientId}`,
      ),
  });
  if (!data) {
    return <p>Error during fetching the data or data does not exists.</p>;
  }
  const redirectUrl = getDiagnosisPatientRecordDetailUrl({
    diagnosisId,
    patientId,
    recordId:,
  }
  return (
    <div className="p-8 px-12">
      <h1 className="text-4xl font-bold">DATA z NISu</h1>
      <Table
        {...{
          columns,
          data,
          pickOptions,
          initialVisibleColumns: [
            "ic_amb_zad",
            "dat_zad",
            "cas_zad",
            "prac_od",
            "text_dg",
            "actions",
          ],
          pickFilterField: "text_dg",
          idColumn: "ic_amb_zad",
          searchField: "amb_zaz_text",
        }}
      />
    </div>
  );
}
