import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BarChart3, CreditCard, FileBarChart, FolderTree, LayoutDashboard, Settings, ShoppingCart, Users, Video, BookOpen } from "lucide-react";
import { AppShell, type NavItem } from "@/components/dashboard/AppShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Vilaiyosai" },
      { name: "description", content: "Manage courses, videos, users and orders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const nav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/videos", label: "Video Management", icon: Video },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/payments", label: "Payments & Refunds", icon: CreditCard },
  { to: "/admin/analytics", label: "Video Analytics", icon: BarChart3 },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  return (
    <AppShell nav={nav} groupLabel="Admin" user={{ name: "Sathish Admin", email: "admin@vilaiyosai.edu", initials: "SA" }} profileTo="/admin/settings">
      <Outlet />
    </AppShell>
  );
}
