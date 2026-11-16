import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Landmark, Loader2, Lock, Smartphone, Tag, Wallet, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { coupons, formatPrice, getCourse } from "@/lib/data";

export const Route = createFileRoute("/_site/checkout/$courseId")({
  loader: ({ params }) => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: () => ({
    meta: [
      { title: "Checkout — Vilaiyosai" },
      { name: "description", content: "Complete your course purchase securely." },
      { property: "og:title", content: "Checkout — Vilaiyosai" },
      { property: "og:description", content: "Complete your course purchase securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const methods = [
  { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "card", label: "Credit / Debit card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "netbanking", label: "Net banking", desc: "All major Indian banks", icon: Landmark },
  { id: "wallet", label: "Wallet", desc: "Paytm, Amazon Pay", icon: Wallet },
];

function Checkout() {
  const { course } = Route.useLoaderData();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState("upi");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; pct: number } | null>(null);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  const original = course.isFree ? 0 : course.price;
  const courseDiscount = course.isFree ? 0 : course.price - (course.discountPrice ?? course.price);
  const subtotal = original - courseDiscount;
  const couponOff = applied ? Math.round((subtotal * applied.pct) / 100) : 0;
  const total = subtotal - couponOff;

  const applyCoupon = () => {
    const pct = coupons[code.trim().toUpperCase()];
    if (!pct) return toast.error("That coupon code isn't valid.");
    setApplied({ code: code.trim().toUpperCase(), pct });
    toast.success(`Coupon applied — ${pct}% off`);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 2) err.name = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Please enter a valid email";
    if (!/^[+\d\s-]{10,}$/.test(form.phone)) err.phone = "Please enter a valid phone number";
    if (!agree) err.agree = "Please accept the terms to continue";
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1600);
  };

  if (status === "done") {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-10 text-center shadow-card">
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
          <h1 className="mt-4 text-2xl font-bold">Payment successful!</h1>
          <p className="mt-2 text-muted-foreground">You now have access to <span className="font-semibold text-foreground">{course.title}</span>. A receipt has been sent to {form.email}.</p>
          <p className="mt-4 text-xs text-muted-foreground">This is a demo checkout — no money was charged.</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild><Link to="/learn/$courseId" params={{ courseId: course.id }}>Start learning</Link></Button>
            <Button asChild variant="outline"><Link to="/dashboard">Go to dashboard</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10 lg:py-14">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground">Complete your purchase to get instant access.</p>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-semibold">Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name} className="sm:col-span-2">
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ananya Krishnan" />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
              </Field>
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-semibold">Payment method</h2>
            <RadioGroup value={method} onValueChange={setMethod} className="mt-4 grid gap-3 sm:grid-cols-2">
              {methods.map((m) => (
                <Label key={m.id} htmlFor={m.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${method === m.id ? "border-primary bg-accent" : "border-border hover:border-primary/40"}`}>
                  <RadioGroupItem value={m.id} id={m.id} />
                  <m.icon className="h-5 w-5 text-primary" />
                  <span>
                    <span className="block text-sm font-semibold">{m.label}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{m.desc}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
            {method === "card" && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Input placeholder="Card number" className="sm:col-span-3" />
                <Input placeholder="MM / YY" />
                <Input placeholder="CVV" />
                <Input placeholder="Name on card" />
              </div>
            )}
            {method === "upi" && <Input className="mt-4" placeholder="yourname@upi" />}
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Lock className="h-3.5 w-3.5" />Payments are encrypted and secure.</p>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-semibold">Order summary</h2>
          <div className="flex gap-3">
            <img src={course.image} alt="" width={1024} height={640} className="h-16 w-24 shrink-0 rounded-md object-cover" />
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-semibold">{course.title}</p>
              <p className="text-xs text-muted-foreground">by {instructor?.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" className="pl-9" disabled={!!applied} />
            </div>
            <Button type="button" variant="outline" onClick={applyCoupon} disabled={!code || !!applied}>Apply</Button>
          </div>
          {applied ? (
            <div className="flex items-center justify-between rounded-md bg-success-soft px-3 py-2 text-xs font-medium text-success">
              {applied.code} applied ({applied.pct}% off)
              <button type="button" onClick={() => { setApplied(null); setCode(""); }} aria-label="Remove coupon"><X className="h-3.5 w-3.5" /></button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Try <span className="font-semibold">WELCOME10</span> for 10% off.</p>
          )}
          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <Row label="Course price" value={formatPrice(original)} />
            {courseDiscount > 0 && <Row label="Discount" value={`− ${formatPrice(courseDiscount)}`} accent />}
            {couponOff > 0 && <Row label="Coupon" value={`− ${formatPrice(couponOff)}`} accent />}
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <dt>Total</dt><dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <div className="flex items-start gap-2">
            <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
            <Label htmlFor="agree" className="text-xs font-normal leading-relaxed text-muted-foreground">
              I agree to the <Link to="/terms" className="text-primary underline">Terms</Link> and <Link to="/refund-policy" className="text-primary underline">Refund Policy</Link>.
            </Label>
          </div>
          {errors.agree && <p className="text-xs text-destructive">{errors.agree}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={status === "processing"}>
            {status === "processing" ? <><Loader2 className="animate-spin" /> Processing…</> : total === 0 ? "Place Order" : `Pay ${formatPrice(total)}`}
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-sm">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "font-medium text-success" : ""}>{value}</dd>
    </div>
  );
}
