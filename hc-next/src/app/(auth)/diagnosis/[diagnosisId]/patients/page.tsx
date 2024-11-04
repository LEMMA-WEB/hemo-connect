"use client";
import Table from "@/components/Table";
import { LinkButton } from "@/components/ui/link-button";
import {
  columns,
  patients,
  genOptions as pickOptions,
} from "@/data/DiagnosisPatients";
import { random } from "@/lib/random";
import { getDiagnosisPatientDetailUrl } from "@/lib/urlBuilder";
import { useParams } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Diagnosis() {
  const { diagnosisId } = useParams();
  const data = patients;

  const randomPatient = patients[random(0, patients.length - 1)];

  return (
    <div className="p-8 px-12">
      <h1 className="text-4xl font-bold">Pacienti</h1>
      <Table
        {...{
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
      <div className="mt-2 flex justify-end">
        <LinkButton
          href={getDiagnosisPatientDetailUrl({
            diagnosisId,
            patientId: randomPatient.ic_pac,
          })}
          size="md"
        >
          <p className="text-medium">Zobrazit detail pacienta</p>

          <FaArrowRightLong size={16} />
        </LinkButton>
      </div>
    </div>
  );
}
