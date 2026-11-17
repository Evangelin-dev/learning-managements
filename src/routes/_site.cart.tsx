
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/cart")({
  component: CartPage,
});

function CartPage() {
  return (
    <main className="min-h-[70vh] bg-[#F8FBFD] px-5 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#D6F5F6]">
          <ShoppingCart className="h-9 w-9 text-[#0056B3]" />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-[#001C3C]">
          Your Shopping Cart
        </h1>

        <p className="mb-8 text-[#64748B]">
          Your cart is currently empty. Explore our courses and start learning!
        </p>

        <Button
          asChild
          className="rounded-full bg-[#0056B3] px-7 text-white hover:bg-[#004494]"
        >
          <Link to="/courses">
            Explore Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
