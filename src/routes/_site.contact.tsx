import { createFileRoute } from "@tanstack/react-router";
import { Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";
import { BRAND, faqs } from "@/lib/data";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Vilaiyosai" },
      { name: "description", content: "Questions about the Share Market Mastery course, payments or access? Get in touch with the Vilaiyosai team — we reply within one working day." },
      { property: "og:title", content: "Contact Us — Vilaiyosai" },
      { property: "og:description", content: "Get in touch with the Vilaiyosai team." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Contact,
});

const topics = [
  "Course enquiry",
  "Payment issue",
  "Course access problem",
  "Refund request",
  "Technical support",
  "Other",
];

function Contact() {
  const [sending, setSending] = useState(false);
  const [topic, setTopic] = useState("");
  return (
    <>
      <PageHero eyebrow="We're here to help" title="Contact us" subtitle="Course, payment ya access se related koi bhi sawaal ho — hum ek working day ke andar reply karte hain." />

      <div className="container-page grid gap-8 py-14 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!topic) return toast.error("Please choose a topic.");
            setSending(true);
            setTimeout(() => {
              setSending(false);
              (e.target as HTMLFormElement).reset();
              setTopic("");
              toast.success("Message sent! We'll reply within one working day.");
            }, 900);
          }}
          className="grid h-fit gap-4 rounded-xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2"
        >
          <div>
            <Label className="mb-1.5 block">Name</Label>
            <Input required placeholder="Your full name" />
          </div>
          <div>
            <Label className="mb-1.5 block">Email</Label>
            <Input type="email" required placeholder="you@example.com" />
          </div>
          <div>
            <Label className="mb-1.5 block">Phone (optional)</Label>
            <Input placeholder="+91 98765 43210" />
          </div>
          <div>
            <Label className="mb-1.5 block">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger><SelectValue placeholder="Choose a topic" /></SelectTrigger>
              <SelectContent>
                {topics.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label className="mb-1.5 block">Message</Label>
            <Textarea rows={6} required placeholder="Apna sawaal detail mein likhiye…" />
          </div>
          <Button type="submit" className="sm:w-fit" disabled={sending}>
            {sending ? <Loader2 className="animate-spin" /> : <Send />}
            Send message
          </Button>
        </form>

        {/* Contact channels */}
        <div className="space-y-4">
          <div className="space-y-4">
            {[
              { i: Mail, l: "Email us", v: BRAND.email, href: `mailto:${BRAND.email}` },
              { i: Phone, l: "Call us", v: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
              { i: MessageCircle, l: "WhatsApp", v: BRAND.whatsapp, href: `https://wa.me/${BRAND.whatsapp.replace(/[\s+]/g, "")}` },
              { i: MapPin, l: "Office", v: BRAND.address },
              { i: Clock, l: "Support hours", v: BRAND.hours },
            ].map(({ i: Icon, l, v, href }) => (
              <a
                key={l}
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noreferrer" : undefined}
                className={`flex items-start gap-3 rounded-xl border border-border bg-aqua p-5 ${href ? "transition-colors hover:border-primary/40" : "cursor-default"}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface text-primary shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{l}</span>
                  <span className="block text-sm text-muted-foreground">{v}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="rounded-xl border border-teal/30 bg-teal/10 p-5 text-sm">
            <p className="font-semibold">Payment related issue?</p>
            <p className="mt-1 text-muted-foreground">Apna Order ID (jaise ORD-10482) message mein zaroor likhein — isse humari team jaldi help kar paayegi.</p>
          </div>
        </div>
      </div>

      {/* Quick answers */}
      <section className="border-t border-border bg-surface py-14">
        <div className="container-page max-w-3xl">
          <h2 className="text-center text-2xl font-semibold">Quick answers</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Shayad aapke sawaal ka jawaab yahin mil jaaye.</p>
          <Accordion type="single" collapsible className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            {faqs.slice(0, 4).map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-b border-border last:border-0">
                <AccordionTrigger className="px-5 text-left text-sm font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="px-5 text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
