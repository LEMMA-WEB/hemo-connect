import { PiRadioactiveLight, PiFlask } from "react-icons/pi";

import { cn } from "@/lib/utils";
import Breadcrumbs from "./breadcrumbs";
import { InfoCard } from "./info-card";
import { Menu } from "./menu";
import { FaRegFolder } from "react-icons/fa";
import { useParams } from "next/navigation";

type MenuSidebarProps = {
  className?: string;
};

export function MenuSidebar({ className }: MenuSidebarProps) {
  const params = useParams();
  console.log(params);
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
          params.patientId
            ? [
                {
                  label: "Příští schůzka",
                  value: "5.11.2024",
                },
                {
                  label: "Poslední schůzka",
                  value: "1.11.2024",
                },
                {
                  label: "Nadpis pole",
                  value: "Hodnota",
                },
              ]
            : []
        }
      />

      {params.patientId && (
        <>
          <Menu
            className="pl-12"
            items={[
              {
                label: "Ambulantní zprávy",
                icon: <FaRegFolder className="text-primary" size={24} />,
              },
              {
                label: "Laboratorní zprávy",
                icon: <PiFlask className="text-primary" size={24} />,
              },
              {
                label: "Rentgeny",
                icon: <PiRadioactiveLight className="text-primary" size={24} />,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
