import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState, PageHeader, StatusBadge, UserAvatar } from "@/components/dashboard/common";
import { formatDate, users } from "@/lib/data";

export const Route = createFileRoute("/admin/users/")({
  head: () => ({ meta: [{ title: "Users — Admin" }, { name: "description", content: "Registered learners." }] }),
  component: UsersPage,
});

function UsersPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const list = users.filter((u) => (status === "all" || u.status === status) && (u.name + u.email).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader title="Users" description={`${users.length} registered users`} />
      <div className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or email" className="bg-surface pl-9" /></div>
        <Select value={status} onValueChange={setStatus}><SelectTrigger className="bg-surface sm:w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All users</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select>
      </div>
      {list.length === 0 ? <EmptyState icon={Users} title="No users found" /> : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <Table>
            <TableHeader><TableRow><TableHead className="pl-5">User</TableHead><TableHead>Phone</TableHead><TableHead>Courses</TableHead><TableHead>Joined</TableHead><TableHead className="pr-5">Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {list.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="pl-5"><Link to="/admin/users/$userId" params={{ userId: u.id }} className="flex items-center gap-3"><UserAvatar initials={u.initials} size="sm" /><span><span className="block font-medium text-primary hover:underline">{u.name}</span><span className="block text-xs text-muted-foreground">{u.email}</span></span></Link></TableCell>
                  <TableCell className="whitespace-nowrap">{u.phone}</TableCell>
                  <TableCell>{u.enrollments.length}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(u.joined)}</TableCell>
                  <TableCell className="pr-5"><StatusBadge status={u.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
