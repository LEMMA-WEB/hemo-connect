"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { getDiagnosisPatientDetailUrl } from "@/lib/urlBuilder";
import { records } from "@/data/PatientRecords";

interface recordProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string;
  url: string;
}

const Record: React.FC<recordProps> = ({ ...props }) => {
  const params = useSearchParams();
  const diagnosisId = params.get("diagnosisId")?.toString() || "";
  const patientId = params.get("patientId")?.toString() || "";
  const data = records;
  return (
    <div {...props}>
      <div className="flex items-start gap-2">
        <LinkButton
          className="bg-primary"
          isIconOnly
          href={getDiagnosisPatientDetailUrl({ diagnosisId, patientId })}
        >
          <ArrowLeft className="text-white" />
        </LinkButton>
        <div>
          <div className="row flex items-baseline gap-2 sm:flex-row">
            <h1 className="text-4xl font-bold">{data[0].ic_amb_zad.trim()}</h1>
            {data[0].text_dg && (
              <span className="font-light">({data[0].text_dg.trim()})</span>
            )}
          </div>
          <div className="row flex items-baseline gap-2 sm:flex-row">
            <span>{data[0].dat_zad}</span>
            <span>{data[0].cas_zad}</span>
          </div>
        </div>
      </div>
      <p className="m-2 h-[700px] overflow-auto rounded-sm border border-solid p-2">
        {data[0].amb_zaz_text}
      </p>
    </div>
  );
};

export default Record;
