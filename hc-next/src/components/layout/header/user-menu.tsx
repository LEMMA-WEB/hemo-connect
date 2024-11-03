import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/session";
import { getSignOutUrl } from "@/lib/urlBuilder";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";

export function UserMenu() {
  const user = useSession()?.data?.user;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-3">
          <Avatar isBordered src={user.image} color="primary" />
          <p className="text-xl">{user.name}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={getSignOutUrl()}>Odhlásit se</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
