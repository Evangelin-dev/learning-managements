import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/faq")({
  head: () => ({
    meta: [
      { title: "FAQs — Vilaiyosai" },
      { name: "description", content: "Answers to common questions about courses, access, payments and refunds." },
      { property: "og:title", content: "FAQs — Vilaiyosai" },
      { property: "og:description", content: "Common questions about courses, access and payments." },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["How long do I have access to a course?", "Most courses include lifetime access. The access period is shown on each course page before you buy."],
  ["Are the classes live?", "No. Every course is pre-recorded so you can learn whenever it suits you, at your own pace."],
  ["Which payment methods do you accept?", "UPI, credit and debit cards, net banking and popular wallets."],
  ["Can I get a refund?", "Yes — if you've watched less than 30% of a course, you can request a refund within 7 days of purchase."],
  ["Can I watch on my phone?", "Yes. Lessons play in any modern browser on mobile, tablet or desktop."],
];

function Faq() {
  return (
    <>
      <PageHero eyebrow="Help centre" title="Frequently asked questions" />
      <div className="container-page max-w-3xl py-12">
        <Accordion type="single" collapsible className="rounded-xl border border-border bg-card px-5">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-semibold">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
