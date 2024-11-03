import { cn } from "@/lib/utils";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { type ReactNode } from "react";

type MenuProps = {
  items: { icon: ReactNode; label: string }[];
  className?: string;
};

export function Menu({ items, className }: MenuProps) {
  return (
    <Listbox className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => (
        <ListboxItem key={item.label} startContent={item.icon}>
          <p className="pl-1 text-xl">{item.label}</p>
        </ListboxItem>
      ))}
    </Listbox>
  );
}
