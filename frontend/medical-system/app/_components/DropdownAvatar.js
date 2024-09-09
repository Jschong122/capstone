import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";
const DropdownAvatar = (data) => {
  const session = data.data;
  const router = useRouter();
  return (
    <div className="cursor-pointer ">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center">
          <UserPen className="mx-2" /> Hi, {session?.user?.name}
          <ChevronDown className="mx-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="cursor-pointer">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/profile/settings")}
            className="cursor-pointer"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            My Appointments
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            My Medical Records
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-red-500 font-bold cursor-pointer hover:bg-red-500 hover:text-white"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownAvatar;
