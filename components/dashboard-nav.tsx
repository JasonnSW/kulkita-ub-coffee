"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Clock,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventaris",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "FIFO",
    href: "/dashboard/fifo",
    icon: Clock,
  },
  {
    title: "Prediksi",
    href: "/dashboard/prediction",
    icon: BarChart3,
  },
  // {
  //   title: "Redistribusi",
  //   href: "/dashboard/redistribusi",
  //   icon: BarChart3,
  // },
  {
    title: "Forecast",
    href: "/dashboard/forecast",
    icon: TrendingUp,
  },
  // {
  //   title: "Penggunaan",
  //   href: "/dashboard/usage",
  //   icon: ShoppingCart,
  // },
  {
    title: "Pengguna",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Pengaturan",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-4 py-4">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-2 py-4 mb-6"
      >
        <Home className="w-6 h-6 text-primary" />
        <span className="text-lg font-bold">Kulkita</span>
      </Link>
      <div className="grid gap-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
              pathname === item.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}
