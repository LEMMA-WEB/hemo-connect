import { PiRadioactive, PiFlask, PiListBullets } from "react-icons/pi";
import { BsFolder } from "react-icons/bs";
import { cn } from "@/lib/utils";
import Breadcrumbs from "./breadcrumbs";
import { InfoCard } from "./info-card";
import { Menu } from "./menu";
import { useParams } from "next/navigation";
import { patients } from "@/data/DiagnosisPatients";

type MenuSidebarProps = {
  className?: string;
};

export function MenuSidebar({ className }: MenuSidebarProps) {
  const params =
    useParams<Partial<{ diagnosisId: string; patientId: string }>>();
  const data = patients;

  return (
    <div className={cn("flex flex-col gap-3 py-3 pr-6", className)}>
      <div className="pl-12">
        <Breadcrumbs />
      </div>
      <InfoCard
        className="translate-x-6"
        heading="C911"
        description="Chronická lymfocytická leukemie z B-buněk"
        data={
          params.patientId && data
            ? [
                {
                  label: "Poslední schůzka",
                  value: data[0]?.last_dat.toString() ?? "",
                },
                {
                  label: "První schůzka",
                  value: data[0]?.first_dat.toString() ?? "",
                },
                {
                  label: "Gynytické markery",
                  value: data[0]?.gen_mark.toString() ?? "",
                },
              ]
            : []
        }
      />

      <Menu
        className="pl-12"
        items={
          params.patientId
            ? [
                {
                  label: "Ambulantní zprávy",
                  icon: <BsFolder className="text-primary" size={24} />,
                },
                {
                  label: "Laboratorní zprávy",
                  icon: <PiFlask className="text-primary" size={24} />,
                },
                {
                  label: "Rentgeny",
                  icon: <PiRadioactive className="text-primary" size={24} />,
                },
              ]
            : [
                {
                  label: "Seznam pacientů",
                  icon: <PiListBullets className="text-primary" size={24} />,
                },
              ]
        }
      />
    </div>
  );
}
