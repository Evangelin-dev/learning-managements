import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose } from "@/components/site/PageHero";

export const Route = createFileRoute("/_site/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Vilaiyosai" },
      { name: "description", content: "When and how you can request a refund for a Vilaiyosai course." },
      { property: "og:title", content: "Refund Policy — Vilaiyosai" },
      { property: "og:description", content: "How refunds work at Vilaiyosai." },
    ],
  }),
  component: () => (
    <>
      <PageHero title="Refund Policy" />
      <Prose
        sections={[
          { h: "Eligibility", p: "You can request a refund within 7 days of purchase if you have watched less than 30% of the course." },
          { h: "How to request", p: "Go to Payment History in your dashboard and choose Request refund, or contact support with your order ID." },
          { h: "Processing time", p: "Approved refunds are returned to your original payment method within 5–7 working days. Course access is removed once a refund is approved." },
        ]}
      />
    </>
  ),
});
