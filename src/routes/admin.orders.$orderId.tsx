import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog, PageHeader, Panel, StatusBadge } from "@/components/dashboard/common";
import { formatDate, formatPrice, getCourse, getOrder, getUser } from "@/lib/data";

export const Route = createFileRoute("/admin/orders/$orderId")({
  loader: ({ params }) => { const order = getOrder(params.orderId); if (!order) throw notFound(); return { order }; },
  head: () => ({ meta: [{ title: "Order Details — Admin" }, { name: "description", content: "Order and transaction details." }] }),
  notFoundComponent: () => <p className="py-20 text-center">Order not found</p>,
  component: OrderDetail,
});

function OrderDetail() {
  const { order } = Route.useLoaderData();
  const [status, setStatus] = useState(order.status);
  const [refund, setRefund] = useState(order.refundStatus);
  const u = getUser(order.userId); const c = getCourse(order.courseId);
  const rows: [string, React.ReactNode][] = [["Order ID", order.id], ["Date", formatDate(order.date)], ["Payment method", order.method], ["Transaction ID", order.transactionId], ["Payment status", <StatusBadge key="s" status={status} />], ["Refund status", <StatusBadge key="r" status={refund} />]];
  return (
    <div>
      <PageHeader title={`Order ${order.id}`} actions={<>
        <Button asChild variant="outline"><Link to="/admin/orders">Back</Link></Button>
        {refund === "requested" && <Button variant="outline" onClick={() => { setRefund("rejected"); toast.success("Refund rejected"); }}>Reject refund</Button>}
        {status === "paid" && <ConfirmDialog title="Refund this order?" description={`${formatPrice(order.amount)} will be returned and course access removed.`} confirmLabel="Refund" onConfirm={() => { setStatus("refunded"); setRefund("approved"); toast.success("Refund issued"); }} trigger={<Button variant="destructive">Issue refund</Button>} />}
      </>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Transaction"><dl className="space-y-3 text-sm">{rows.map(([k, v]) => <div key={k} className="flex justify-between gap-3"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}</dl></Panel>
        <Panel title="Customer & course">
          <p className="font-semibold">{u?.name}</p><p className="text-sm text-muted-foreground">{u?.email} · {u?.phone}</p>
          <div className="mt-4 flex gap-3 rounded-lg border border-border p-3"><img src={c?.image} alt="" className="h-14 w-20 rounded object-cover" /><div><p className="text-sm font-medium">{c?.title}</p><p className="text-xs text-muted-foreground">List {formatPrice(c?.price ?? 0)}</p></div></div>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Discount</dt><dd>− {formatPrice(order.discount)}</dd></div>
            <div className="flex justify-between font-bold"><dt>Total paid</dt><dd>{formatPrice(order.amount)}</dd></div>
          </dl>
        </Panel>
      </div>
    </div>
  );
}
