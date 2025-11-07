"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { UserNav } from "@/components/user-nav";
import { DashboardNav } from "@/components/dashboard-nav";
import ComingSoon from "@/public/coming-soon.svg";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <MobileNav />
        <div className="hidden md:flex md:flex-1">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <div className="flex flex-col items-start justify-center">
              <div className="relative flex items-center">
                <Image
                  src={logo}
                  alt="Kulkita Logo"
                  width={36}
                  height={36}
                  className="absolute"
                />
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 pl-8">
                  ulkita
                </h1>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                SEGAR TERKELOLA, GIZI TERSALUR
              </p>
            </div>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <DashboardNav />
        </aside>
        <div className="w-screen flex flex-col items-center justify-start px-4 text-center space-y-4">
          <Image src={ComingSoon} width={400} height={400} alt="Coming soon" />
          <h1 className="font-serif text-accent-green text-3xl md:text-5xl">Coming Soon</h1>
          <h2 className="max-w-xl text-black text-base md:text-lg">
            Maaf, Fitur sedang dalam pengembangan, Silahkan coba menggunakan
            fitur lain yang tersedia!
          </h2>
        </div>
      </div>
    </div>
  );
}
