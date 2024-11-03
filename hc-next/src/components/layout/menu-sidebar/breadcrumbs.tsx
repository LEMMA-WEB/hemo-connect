import {
  getDiagnosisPatientDetailUrl,
  getDiagnosisPatientsUrl,
  getDiagnosisUrl,
} from "@/lib/urlBuilder";
import { BreadcrumbItem, Breadcrumbs as _Breadcrumbs } from "@nextui-org/react";

export default function Breadcrumbs() {
  // TODO: Make it work dynamically
  const diagnosis = {
    id: "c911",
    name: "C911",
  };

  const patient = {
    id: "123",
    name: "Jan Novák",
  };

  return (
    <_Breadcrumbs size="md">
      <BreadcrumbItem className="text-default-400" href={getDiagnosisUrl()}>
        Diagnozy
      </BreadcrumbItem>
      {diagnosis.id && (
        <BreadcrumbItem
          className="text-default-400"
          href={getDiagnosisPatientsUrl(diagnosis.id)}
        >
          {diagnosis.name}
        </BreadcrumbItem>
      )}
      {patient.id && diagnosis.id && (
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
      <BreadcrumbItem className="text-default-400">Chat</BreadcrumbItem>
    </_Breadcrumbs>
  );
}
