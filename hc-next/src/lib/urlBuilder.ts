export function getSignInUrl() {
  return "/api/auth/signin";
}

export function getSignOutUrl() {
  return "/api/auth/signout";
}

export function getDiagnosisUrl(id?: string) {
  if (!id) return "/diagnosis";
  return `/diagnosis/${id}`;
}

export function getDashboardsUrl() {
  return "/diagnosis";
}

export function getPatientUrl({
  patientId,
  diagnosisId,
}: {
  patientId: string;
  diagnosisId: string;
}) {
  return `/diagnosis/${diagnosisId}/patient/${patientId}`;
}
