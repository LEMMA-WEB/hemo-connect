import {
  getDiagnosisPatientDetailUrl,
  getDiagnosisPatientsUrl,
  getDiagnosisUrl,
} from "@/lib/urlBuilder";
import { diagnosisList } from "@/modules/diagnosis/const/data";
import { BreadcrumbItem, Breadcrumbs as _Breadcrumbs } from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const params =
    useParams<Partial<{ diagnosisId: string; patientId: string }>>();

  const isChat = usePathname().includes("chat");

  const diagnosis = diagnosisList.find((x) => x.uniqId === params.diagnosisId);

  // TODO: Make it work dynamically
  const patient = params.patientId
    ? {
        id: params.patientId,
        name: "Jan Novák",
      }
    : null;

  return (
    <_Breadcrumbs size="md">
      <BreadcrumbItem className="text-default-400" href={getDiagnosisUrl()}>
        Diagnozy
      </BreadcrumbItem>
      {diagnosis?.id && (
        <BreadcrumbItem
          className="text-default-400"
          href={getDiagnosisPatientsUrl(diagnosis.id)}
        >
          {diagnosis.id}
        </BreadcrumbItem>
      )}
      {patient?.id && diagnosis?.id && (
        <BreadcrumbItem
          className="text-default-400"
          href={getDiagnosisPatientDetailUrl({
            patientId: patient.id,
            diagnosisId: diagnosis.id,
          })}
        >
          {patient.name
            .split(" ")
            .map((x) => x[0])
            .join("")}
        </BreadcrumbItem>
      )}
      {isChat && (
        <BreadcrumbItem className="text-default-400">Chat</BreadcrumbItem>
      )}
    </_Breadcrumbs>
  );
}
