import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel } from "@/components/dashboard/common";
import { formatPrice, revenueByMonth } from "@/lib/data";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — Admin" }, { name: "description", content: "Download business reports." }] }),
  component: Reports,
});

const reports = ["Sales report", "Orders report", "Refunds report", "Users report", "Course enrolments", "Video engagement"];

function Reports() {
  return (
    <div>
      <PageHeader title="Reports" description="Download summaries of your platform's performance." />
      <Panel title="Monthly orders">
        <div className="h-64"><ResponsiveContainer><BarChart data={revenueByMonth}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} /><XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} /><YAxis fontSize={12} tickLine={false} axisLine={false} /><Tooltip formatter={(v: number, n) => (n === "revenue" ? formatPrice(v) : v)} /><Bar dataKey="orders" fill="var(--teal)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </Panel>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <div key={r} className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-aqua text-primary"><FileSpreadsheet className="h-5 w-5" /></span>
            <div className="flex-1"><p className="font-medium">{r}</p><p className="text-xs text-muted-foreground">CSV · Last 6 months</p></div>
            <Button size="icon" variant="outline" aria-label={`Download ${r}`} onClick={() => toast.success(`${r} downloaded (demo)`)}><Download /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
