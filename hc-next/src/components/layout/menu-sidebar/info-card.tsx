import { cn } from "@/lib/utils";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

type InfoCardProps = {
  className?: string;
  heading: string;
  description?: string;
  data?: { label: string; value: string }[];
};

export function InfoCard({
  className,
  heading,
  description,
  data,
}: InfoCardProps) {
  return (
    <Card
      className={cn(
        "flex w-80 flex-col gap-4 bg-primary p-5 py-4 text-white",
        className,
      )}
    >
      <CardHeader className="pt flex flex-col items-start gap-1 p-0">
        <h2 className="text-3xl">{heading}</h2>
        <p className="text-medium">{description}</p>
      </CardHeader>

      {data?.length && (
        <CardBody className="p-0">
          <ul className="flex flex-col gap-3">
            {data.map((item, i) => (
              <li
                key={item.label + i}
                className="rounded-md bg-primary px-3 py-2 text-medium brightness-[115%]"
              >
                {item.label}: {item.value}
              </li>
            ))}
          </ul>
        </CardBody>
      )}
    </Card>
  );
}
