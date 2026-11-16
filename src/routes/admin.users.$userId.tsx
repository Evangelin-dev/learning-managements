import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfirmDialog, PageHeader, Panel, ProgressBar, StatusBadge, UserAvatar } from "@/components/dashboard/common";
import { courses, formatDate, formatPrice, getCourse, getUser, orders } from "@/lib/data";

export const Route = createFileRoute("/admin/users/$userId")({
  loader: ({ params }) => { const user = getUser(params.userId); if (!user) throw notFound(); return { user }; },
  head: () => ({ meta: [{ title: "User Details — Admin" }, { name: "description", content: "Learner profile and access." }] }),
  notFoundComponent: () => <p className="py-20 text-center">User not found</p>,
  component: UserDetail,
});

function UserDetail() {
  const { user } = Route.useLoaderData();
  const [enr, setEnr] = useState(user.enrollments);
  const [active, setActive] = useState(user.status === "active");
  const [grant, setGrant] = useState("");
  const history = orders.filter((o) => o.userId === user.id);
  const update = (courseId: string, patch: Partial<(typeof enr)[0]>, msg: string) => { setEnr(enr.map((e) => (e.courseId === courseId ? { ...e, ...patch } : e))); toast.success(msg); };

  return (
    <div>
      <PageHeader title={user.name} description={user.email} actions={<>
        <Button asChild variant="outline"><Link to="/admin/users">Back</Link></Button>
        {active ? <ConfirmDialog title="Deactivate this user?" description="They will no longer be able to log in or watch courses." confirmLabel="Deactivate" onConfirm={() => { setActive(false); toast.success("User deactivated"); }} trigger={<Button variant="destructive">Deactivate</Button>} />
          : <Button onClick={() => { setActive(true); toast.success("User reactivated"); }}>Reactivate</Button>}
      </>} />
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <Panel title="Profile">
          <div className="flex flex-col items-center text-center"><UserAvatar initials={user.initials} size="lg" /><p className="mt-3 font-semibold">{user.name}</p><StatusBadge status={active ? "active" : "inactive"} /></div>
          <dl className="mt-5 space-y-2 text-sm">
            {[["Email", user.email], ["Phone", user.phone], ["City", user.city], ["Joined", formatDate(user.joined)]].map(([k, v]) => <div key={k} className="flex justify-between gap-2"><dt className="text-muted-foreground">{k}</dt><dd className="truncate">{v}</dd></div>)}
          </dl>
        </Panel>
        <div className="space-y-6">
          <Panel title="Purchased courses & access" action={
            <div className="flex gap-2">
              <Select value={grant} onValueChange={setGrant}><SelectTrigger className="h-8 w-44"><SelectValue placeholder="Grant course" /></SelectTrigger><SelectContent>{courses.filter((c) => !enr.some((e) => e.courseId === c.id)).map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent></Select>
              <Button size="sm" disabled={!grant} onClick={() => { setEnr([...enr, { courseId: grant, progress: 0, completedLessons: 0, expires: "Lifetime", access: "active" }]); setGrant(""); toast.success("Access granted"); }}>Grant</Button>
            </div>}>
            {enr.length === 0 ? <p className="text-sm text-muted-foreground">No purchased courses yet.</p> : (
              <ul className="space-y-4">
                {enr.map((e) => (
                  <li key={e.courseId} className="rounded-lg border border-border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{getCourse(e.courseId)?.title}</p><StatusBadge status={e.access} /></div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground"><ProgressBar value={e.progress} className="flex-1" /><span>{e.progress}% · {e.completedLessons} lessons</span></div>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Expires: {e.expires}</span>
                      <Button size="sm" variant="outline" className="ml-auto" onClick={() => update(e.courseId, { expires: "Extended +6 months" }, "Access extended by 6 months")}>Extend</Button>
                      {e.access === "active" ? <ConfirmDialog title="Revoke access?" description="The learner will lose access to this course." confirmLabel="Revoke" onConfirm={() => update(e.courseId, { access: "revoked" }, "Access revoked")} trigger={<Button size="sm" variant="outline">Revoke</Button>} />
                        : <Button size="sm" variant="outline" onClick={() => update(e.courseId, { access: "active" }, "Access restored")}>Restore</Button>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Order history">
            {history.length === 0 ? <p className="text-sm text-muted-foreground">No orders.</p> : (
              <ul className="divide-y divide-border">{history.map((o) => <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><Link to="/admin/orders/$orderId" params={{ orderId: o.id }} className="font-medium text-primary">{o.id}</Link><span className="flex-1 truncate px-2">{getCourse(o.courseId)?.title}</span><span>{formatPrice(o.amount)}</span><StatusBadge status={o.status} /></li>)}</ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
