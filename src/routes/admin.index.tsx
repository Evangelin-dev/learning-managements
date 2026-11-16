import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Eye, IndianRupee, ShoppingCart, UserCheck, Users } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, Panel, ProgressBar, StatCard, StatusBadge, UserAvatar } from "@/components/dashboard/common";
import { courses, formatDate, formatNumber, formatPrice, getCourse, getUser, orders, revenueByMonth, users, videos, viewsByDay } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Vilaiyosai" }, { name: "description", content: "Revenue, orders and engagement at a glance." }] }),
  component: AdminOverview,
});

function AdminOverview() {
  const paid = orders.filter((o) => o.status === "paid");
  const pending = orders.filter((o) => o.status === "pending");
  const revenue = revenueByMonth.reduce((n, m) => n + m.revenue, 0);
  const purchasers = new Set(paid.map((o) => o.userId)).size;
  const totalViews = videos.reduce((n, v) => n + v.views, 0);
  const top = [...courses].filter((c) => c.status === "published").sort((a, b) => b.students - a.students).slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" description="Welcome back. Here's how your courses are doing." actions={<Button asChild><Link to="/admin/courses/new">Add New Course</Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatPrice(revenue)} icon={IndianRupee} change={18.2} />
        <StatCard label="Total Orders" value={formatNumber(1147)} icon={ShoppingCart} change={12.4} tone="teal" />
        <StatCard label="Successful Payments" value={formatNumber(1089)} icon={CheckCircle2} change={11.8} tone="success" />
        <StatCard label="Pending Payments" value={String(pending.length)} icon={Clock} change={-4.1} tone="warning" />
        <StatCard label="Registered Users" value={formatNumber(10482)} icon={Users} change={9.6} />
        <StatCard label="Course Purchasers" value={formatNumber(6214 + purchasers)} icon={UserCheck} change={7.3} tone="teal" />
        <StatCard label="Total Video Views" value={formatNumber(totalViews)} icon={Eye} change={22.5} tone="success" />
        <StatCard label="Avg. Completion" value="68%" icon={CheckCircle2} change={3.2} tone="warning" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Sales revenue" action={<span className="text-xs text-muted-foreground">Last 6 months</span>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByMonth} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" tickFormatter={(v) => `₹${v / 1000}k`} width={52} />
                <Tooltip formatter={(v: number) => formatPrice(v)} contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Top-selling courses">
          <ul className="space-y-4">
            {top.map((c, i) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="w-4 text-sm font-semibold text-muted-foreground">{i + 1}</span>
                <img src={c.image} alt="" width={1024} height={640} className="h-10 w-14 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{formatNumber(c.students)} sales</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Recent orders" action={<Link to="/admin/orders" className="text-sm font-medium text-primary hover:underline">View all</Link>} className="min-w-0">
          <div className="-mx-5 -my-5 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow><TableHead className="pl-5">Order</TableHead><TableHead>Customer</TableHead><TableHead>Course</TableHead><TableHead>Amount</TableHead><TableHead className="pr-5">Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 6).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="pl-5"><Link to="/admin/orders/$orderId" params={{ orderId: o.id }} className="font-medium text-primary hover:underline">{o.id}</Link></TableCell>
                    <TableCell className="whitespace-nowrap">{getUser(o.userId)?.name}</TableCell>
                    <TableCell className="max-w-48 truncate">{getCourse(o.courseId)?.title}</TableCell>
                    <TableCell>{formatPrice(o.amount)}</TableCell>
                    <TableCell className="pr-5"><StatusBadge status={o.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>
        <Panel title="Recent registered users" action={<Link to="/admin/users" className="text-sm font-medium text-primary hover:underline">View all</Link>}>
          <ul className="space-y-3">
            {[...users].reverse().slice(0, 5).map((u) => (
              <li key={u.id} className="flex items-center gap-3">
                <UserAvatar initials={u.initials} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{u.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{formatDate(u.joined)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Course performance overview">
          <ul className="space-y-4">
            {top.map((c) => {
              const vs = videos.filter((v) => v.courseId === c.id);
              const comp = Math.round(vs.reduce((n, v) => n + v.completion, 0) / (vs.length || 1));
              return (
                <li key={c.id}>
                  <div className="flex justify-between text-sm"><span className="truncate pr-3 font-medium">{c.title}</span><span className="shrink-0 text-muted-foreground">{comp}% completion</span></div>
                  <ProgressBar value={comp} className="mt-2" />
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel title="Video engagement summary" action={<Link to="/admin/analytics" className="text-sm font-medium text-primary hover:underline">Details</Link>}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsByDay} margin={{ left: -12, right: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Bar dataKey="plays" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="viewers" fill="var(--teal)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}
