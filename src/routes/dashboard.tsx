import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BookOpen, CreditCard, LayoutDashboard, LifeBuoy, PlayCircle, User } from "lucide-react";
import { AppShell, type NavItem } from "@/components/dashboard/AppShell";
import { currentStudent } from "@/lib/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Vilaiyosai" },
      { name: "description", content: "Your courses, progress and payments." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudentLayout,
});

const nav: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/courses", label: "My Courses", icon: BookOpen },
  { to: "/dashboard/learning", label: "My Learning", icon: PlayCircle },
  { to: "/dashboard/payments", label: "Payment History", icon: CreditCard },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy },
];

function StudentLayout() {
  return (
    <AppShell nav={nav} groupLabel="Learning" user={currentStudent!} profileTo="/dashboard/profile">
      <Outlet />
    </AppShell>
  );
}
