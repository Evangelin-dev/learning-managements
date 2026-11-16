import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, Panel } from "@/components/dashboard/common";
import { BRAND } from "@/lib/data";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Admin" }, { name: "description", content: "Platform settings." }] }),
  component: Settings,
});

function Settings() {
  const save = (e: React.FormEvent) => { e.preventDefault(); toast.success("Settings saved"); };
  return (
    <div>
      <PageHeader title="Settings" />
      <Tabs defaultValue="general">
        <TabsList><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="payments">Payments</TabsTrigger><TabsTrigger value="videos">Video</TabsTrigger></TabsList>
        <TabsContent value="general"><Panel><form onSubmit={save} className="grid max-w-xl gap-4">
          <div><Label className="mb-1.5 block">Platform name</Label><Input defaultValue={BRAND.name} /></div>
          <div><Label className="mb-1.5 block">Support email</Label><Input defaultValue={BRAND.email} /></div>
          <div><Label className="mb-1.5 block">Phone</Label><Input defaultValue={BRAND.phone} /></div>
          <Button className="w-fit">Save</Button></form></Panel></TabsContent>
        <TabsContent value="payments"><Panel><form onSubmit={save} className="grid max-w-xl gap-4">
          {["UPI", "Cards", "Net banking", "Wallets"].map((m) => <div key={m} className="flex items-center justify-between"><Label>{m}</Label><Switch defaultChecked /></div>)}
          <div><Label className="mb-1.5 block">Refund window (days)</Label><Input type="number" defaultValue={7} /></div>
          <p className="text-xs text-muted-foreground">Payment gateway is not connected yet.</p>
          <Button className="w-fit">Save</Button></form></Panel></TabsContent>
        <TabsContent value="videos"><Panel><form onSubmit={save} className="grid max-w-xl gap-4">
          <div className="flex items-center justify-between"><Label>Allow downloads by default</Label><Switch /></div>
          <div className="flex items-center justify-between"><Label>Show watermark with learner email</Label><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><Label>Auto-play next lesson</Label><Switch defaultChecked /></div>
          <Button className="w-fit">Save</Button></form></Panel></TabsContent>
      </Tabs>
    </div>
  );
}
