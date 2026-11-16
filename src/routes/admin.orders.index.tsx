import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState, PageHeader, StatusBadge } from "@/components/dashboard/common";
import { formatDate, formatPrice, getCourse, getUser, orders } from "@/lib/data";

export const Route = createFileRoute("/admin/orders/")({
  head: () => ({ meta: [{ title: "Orders — Admin" }, { name: "description", content: "All course orders." }] }),
  component: Orders,
});

function Orders() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const list = orders.filter((o) => (tab === "all" || o.status === tab) && (o.id + getUser(o.userId)?.name + getUser(o.userId)?.email).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Orders" description={`${orders.length} orders`} actions={<Button variant="outline" onClick={() => toast.success("Orders exported to CSV (demo)")}><Download />Export</Button>} />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Tabs value={tab} onValueChange={setTab}><TabsList className="flex-wrap">{["all", "paid", "pending", "failed", "refunded"].map((t) => <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>)}</TabsList></Tabs>
        <div className="relative md:w-72"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders" className="bg-surface pl-9" /></div>
      </div>
      {list.length === 0 ? <EmptyState title="No orders found" /> : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <Table>
            <TableHeader><TableRow><TableHead className="pl-5">Order ID</TableHead><TableHead>Customer</TableHead><TableHead>Course</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Date</TableHead><TableHead className="pr-5">Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {list.map((o) => { const u = getUser(o.userId); return (
                <TableRow key={o.id}>
                  <TableCell className="pl-5"><Link to="/admin/orders/$orderId" params={{ orderId: o.id }} className="font-medium text-primary hover:underline">{o.id}</Link></TableCell>
                  <TableCell><p className="whitespace-nowrap">{u?.name}</p><p className="text-xs text-muted-foreground">{u?.email}</p></TableCell>
                  <TableCell className="max-w-52 truncate">{getCourse(o.courseId)?.title}</TableCell>
                  <TableCell>{formatPrice(o.amount)}</TableCell>
                  <TableCell>{o.method}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(o.date)}</TableCell>
                  <TableCell className="pr-5"><StatusBadge status={o.status} /></TableCell>
                </TableRow>); })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
