"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  BarChart3,
  Trophy,
  Medal,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, href: "/", label: "Dashboard" },
  { icon: BookOpen, href: "#", label: "Learning Paths" },
  { icon: ClipboardList, href: "#", label: "Interviews" },
  { icon: Users, href: "/interview", label: "Mock Interviews" },
  { icon: BarChart3, href: "#", label: "Analytics" },
  { icon: Trophy, href: "#", label: "Achievements" },
  { icon: Medal, href: "#", label: "Leaderboard" },
  { icon: Settings, href: "#", label: "Settings" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/interview"
            ? pathname.startsWith("/interview")
            : item.href === "/"
            ? pathname === "/"
            : pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            title={item.label}
            className={isActive ? "sidebar-icon-active" : "sidebar-icon"}
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;
