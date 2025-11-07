import type React from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { NotificationPanel } from "@/components/notification-panel";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <header
        className="top-0 inset-x-0 w-full z-50 border-b flex items-center gap-x-4 bg-background supports-[backdrop-filter]:bg-background/80 backdrop-blur px-4 md:px-6 min-h-14 md:min-h-[72px] py-2 md:py-3 pt-[env(safe-area-inset-top)]
  "
      >
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
        <div>
          <Link href="/dashboard/notification">
            <NotificationPanel />
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-background md:block">
          <DashboardNav />
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
