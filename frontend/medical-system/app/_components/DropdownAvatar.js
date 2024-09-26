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
import { signOut } from "next-auth/react";

const DropdownAvatar = (data) => {
  const session = data.data;
  const router = useRouter();

  if (session?.user?.role === "doctor") {
    return (
      <div className="cursor-pointer ">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {session?.user?.imageUrl ? (
              <img
                src={session?.user?.imageUrl}
                alt={`${session?.user?.name}'s profile`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
            ) : (
              <UserPen className="mx-2" />
            )}
            Hi, {session?.user?.name}
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
              settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="text-red-500 font-bold cursor-pointer hover:bg-red-500 hover:text-white"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  if (session?.user?.role === "patient") {
    return (
      <div className="cursor-pointer ">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            {session?.user?.imageUrl ? (
              <img
                src={session?.user?.imageUrl}
                alt={`${session?.user?.name}'s profile`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
              />
            ) : (
              <UserPen className="mx-2" />
            )}
            Hi, {session?.user?.name}
            <ChevronDown className="mx-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="cursor-pointer">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/profile/my-appointment")}
            >
              My Appointments
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push("/profile/book-appointment")}
            >
              Book Appointment
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/profile/settings")}
              className="cursor-pointer"
            >
              settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="text-red-500 font-bold cursor-pointer hover:bg-red-500 hover:text-white"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
};

export default DropdownAvatar;
