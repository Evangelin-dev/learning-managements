import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog, PageHeader, Panel, StatCard, StatusBadge } from "@/components/dashboard/common";
import { formatDate, formatPrice, getCourse, getUser, orders as seed } from "@/lib/data";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({ meta: [{ title: "Payments & Refunds — Admin" }, { name: "description", content: "Payments and refund requests." }] }),
  component: Payments,
});

function Payments() {
  const [list, setList] = useState(seed);
  const sum = (s: string) => list.filter((o) => o.status === s).reduce((n, o) => n + o.amount, 0);
  const requests = list.filter((o) => o.refundStatus !== "none");
  const act = (id: string, approve: boolean) => { setList(list.map((o) => o.id === id ? { ...o, refundStatus: approve ? "approved" : "rejected", status: approve ? "refunded" : o.status } : o)); toast.success(approve ? "Refund approved" : "Refund rejected"); };
  return (
    <div>
      <PageHeader title="Payments & Refunds" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Collected" value={formatPrice(sum("paid"))} icon={CheckCircle2} tone="success" />
        <StatCard label="Pending" value={formatPrice(sum("pending"))} icon={Clock} tone="warning" />
        <StatCard label="Failed" value={formatPrice(sum("failed"))} icon={XCircle} />
        <StatCard label="Refunded" value={formatPrice(sum("refunded"))} icon={RotateCcw} tone="teal" />
      </div>
      <Panel title="Refund requests" className="mt-6">
        <div className="-m-5 overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead className="pl-5">Order</TableHead><TableHead>Customer</TableHead><TableHead>Course</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Refund</TableHead><TableHead className="pr-5 text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {requests.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="pl-5"><Link to="/admin/orders/$orderId" params={{ orderId: o.id }} className="font-medium text-primary">{o.id}</Link></TableCell>
                  <TableCell className="whitespace-nowrap">{getUser(o.userId)?.name}</TableCell>
                  <TableCell className="max-w-48 truncate">{getCourse(o.courseId)?.title}</TableCell>
                  <TableCell>{formatPrice(o.amount)}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(o.date)}</TableCell>
                  <TableCell><StatusBadge status={o.refundStatus} /></TableCell>
                  <TableCell className="whitespace-nowrap pr-5 text-right">
                    {o.refundStatus === "requested" ? <>
                      <Button size="sm" variant="outline" className="mr-2" onClick={() => act(o.id, false)}>Reject</Button>
                      <ConfirmDialog title="Approve refund?" description={`${formatPrice(o.amount)} will be returned to the customer.`} confirmLabel="Approve" onConfirm={() => act(o.id, true)} trigger={<Button size="sm">Approve</Button>} />
                    </> : <span className="text-xs text-muted-foreground">Done</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </div>
  );
}
