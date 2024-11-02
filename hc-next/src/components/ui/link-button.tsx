import { Button, type ButtonProps } from "@nextui-org/react";
import Link, { type LinkProps } from "next/link";

type LinkButtonProps = {
  href: LinkProps["href"];
} & ButtonProps;

export function LinkButton({ href, ...props }: LinkButtonProps) {
  return (
    <Link href={href}>
      <Button
        color="primary"
        size="lg"
        className="text-xl"
        {...props}
        tabIndex={-1}
      />
    </Link>
  );
}
