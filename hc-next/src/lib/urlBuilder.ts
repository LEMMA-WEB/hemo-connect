export function getSignInUrl() {
  return "/api/auth/signin";
}

export function getSignOutUrl() {
  return "/api/auth/signout";
}

export function getDiagnosisUrl() {
  return "/diagnosis/";
}

export function getDiagnosisPatientsUrl(diagnosisId: string | number) {
  return `/diagnosis/${diagnosisId}/patients`;
}

export function getDiagnosisPatientsChatUrl(diagnosisId: string | number) {
  return `/diagnosis/${diagnosisId}/patients/chat`;
}

export function getDiagnosisPatientDetailUrl({
  diagnosisId,
  patientId,
}: {
  diagnosisId: string | number;
  patientId: string | number;
}) {
  return `/diagnosis/${diagnosisId}/patients/${patientId}`;
}

export function getDiagnosisPatientDetailChatUrl({
  diagnosisId,
  patientId,
}: {
  diagnosisId: string | number;
  patientId: string | number;
}) {
  return `/diagnosis/${diagnosisId}/patients/${patientId}/chat`;
}
