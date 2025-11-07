"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/features/auth/actions/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function UserNav() {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/user");

      if (!res.ok) {
        throw new Error("Gagal mengambil data profil");
      }

      return res.json();
    },
  });
  const handleLogout = () => {
    logoutAction();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=9" alt="@user" />
            <AvatarFallback className="bg-primary/10 text-primary">
              US
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          {isLoading ? (
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Memuat...</p>
              <p className="text-xs leading-none text-muted-foreground">-</p>
            </div>
          ) : error ? (
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Error</p>
              <p className="text-xs leading-none text-muted-foreground">-</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {data?.username}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {data?.email}
              </p>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profil</DropdownMenuItem>
          <DropdownMenuItem>Pengaturan</DropdownMenuItem>
          <DropdownMenuItem>Unit Mitra</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Keluar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
