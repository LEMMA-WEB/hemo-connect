import { DiagnosisSearch } from "@/modules/diagnosis/components";

export default function Diagnosis() {
  return (
    <div className="flex h-full justify-center pt-24">
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl font-semibold">Vyberte diagnozu</h1>

        <DiagnosisSearch />
      </div>
    </div>
  );
}
