"use client";
import Table from "@/components/Table";
import { LinkButton } from "@/components/ui/link-button";
import { getDiagnosisPatientDetailChatUrl } from "../../../../../../lib/urlBuilder";
import { FaArrowRightLong } from "react-icons/fa6";

import {
  columns,
  descOptions as pickOptions,
  records,
} from "@/data/PatientRecords";
import { useParams } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function Patient() {
  const { diagnosisId, patientId } = useParams();
  const data = records;
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
      <div className="mt-2 flex justify-end">
        <LinkButton
          href={getDiagnosisPatientDetailChatUrl({
            diagnosisId,
            patientId,
          })}
          size="md"
        >
          <p className="text-medium">Začít chat</p>

          <FaArrowRightLong size={16} />
        </LinkButton>
      </div>
    </div>
  );
}
