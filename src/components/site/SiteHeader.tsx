
import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses/ai-agentic", label: "Courses" },
  { to: "/about", label: "About Us" },
  { to: "/instructors", label: "Instructors" },
  { to: "/contact", label: "Contact" },
] as const;

const navLinkClass =
  "relative whitespace-nowrap py-2 font-sans text-sm font-medium text-[#001C3C] transition-colors duration-200 hover:text-[#0056B3] hover:after:absolute hover:after:inset-x-0 hover:after:-bottom-0.5 hover:after:h-0.5 hover:after:rounded-full hover:after:bg-[#2EC4CC]";

const activeNavClass =
  "data-[status=active]:text-[#001C3C] data-[status=active]:after:absolute data-[status=active]:after:inset-x-0 data-[status=active]:after:-bottom-0.5 data-[status=active]:after:h-0.5 data-[status=active]:after:rounded-full data-[status=active]:after:bg-[#2EC4CC]";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

function getCartCount() {
  try {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("learning-cart") || "[]"
    );

    return cart.reduce(
      (total, item) => total + (Number(item.quantity) || 1),
      0
    );
  } catch {
    return 0;
  }
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    // Initial cart count
    updateCartCount();

    // Listen for Add to Cart events
    window.addEventListener("cart-updated", updateCartCount);

    // Update when returning to this browser tab
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5EDF3] bg-white shadow-[0_2px_12px_rgba(0,28,60,0.06)]">
      <div className="container-page flex h-[76px] items-center justify-between gap-3 xl:gap-5">

        {/* Logo - unchanged */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={`${navLinkClass} ${activeNavClass}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">

          {/* My Learning */}
          <Button
            asChild
            variant="ghost"
            className="whitespace-nowrap font-sans text-sm font-semibold text-[#001C3C] transition-colors hover:bg-[#D6F5F6] hover:text-[#0056B3]"
          >
            <Link to="/dashboard">My Learning</Link>
          </Button>

          {/* Search Bar */}
          <form
            action="/courses"
            method="get"
            className="flex h-10 w-[170px] items-center rounded-full border border-[#DCE8EF] bg-[#F8FBFD] px-3 transition-all duration-200 focus-within:border-[#2EC4CC] focus-within:ring-2 focus-within:ring-[#2EC4CC]/20 2xl:w-[200px]"
          >
            <Search className="h-4 w-4 shrink-0 text-[#0056B3]" />
            <input
              type="search"
              name="q"
              placeholder="Search courses..."
              aria-label="Search courses"
              className="ml-2 min-w-0 w-full bg-transparent font-sans text-sm text-[#001C3C] outline-none placeholder:text-[#8295A5]"
            />
          </form>

          {/* Shopping Cart with Live Count */}
          <Link
            to="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#001C3C] transition-colors hover:bg-[#D6F5F6] hover:text-[#0056B3]"
          >
            <ShoppingCart className="h-5 w-5" />

            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#2EC4CC] px-1 text-[10px] font-bold text-[#001C3C]">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </Link>

          {/* Login */}
          <Button
            asChild
            className="rounded-full bg-[#0056B3] px-6 font-sans text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#004494] hover:shadow-md active:bg-[#003A7D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0056B3]"
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Open menu"
              className="h-10 w-10 border-[#D6F5F6] text-[#001C3C] transition-colors hover:border-[#0056B3] hover:bg-[#D6F5F6] hover:text-[#0056B3]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-80 border-l border-[#E5EDF3] bg-white"
          >
            <SheetTitle className="sr-only">
              Navigation Menu
            </SheetTitle>

            <div className="mt-8 flex flex-col gap-2">
              <div className="mb-5 border-b border-[#E5EDF3] pb-5">
                <Logo />
              </div>

              {/* Mobile Search */}
              <form
                action="/courses"
                method="get"
                className="mb-3 flex h-11 items-center rounded-full border border-[#DCE8EF] bg-[#F8FBFD] px-3 focus-within:border-[#2EC4CC]"
              >
                <Search className="h-4 w-4 shrink-0 text-[#0056B3]" />
                <input
                  type="search"
                  name="q"
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  className="ml-2 w-full min-w-0 bg-transparent font-sans text-sm text-[#001C3C] outline-none placeholder:text-[#8295A5]"
                />
              </form>

              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-lg border-l-2 border-transparent px-3 py-3 font-sans text-base font-medium text-[#001C3C] transition-colors hover:border-[#2EC4CC] hover:bg-[#D6F5F6] hover:text-[#0056B3] data-[status=active]:border-[#2EC4CC] data-[status=active]:bg-[#D6F5F6] data-[status=active]:font-semibold"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-5 grid gap-3 border-t border-[#E5EDF3] pt-5">

                {/* My Learning */}
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-full border-2 border-[#0056B3] font-sans text-base font-semibold text-[#0056B3] hover:bg-[#0056B3] hover:text-white"
                >
                  <Link to="/dashboard">My Learning</Link>
                </Button>

                {/* Mobile Cart with Count */}
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-full border-2 border-[#DCE8EF] font-sans text-base font-semibold text-[#001C3C] hover:bg-[#D6F5F6]"
                >
                  <Link to="/cart" className="flex items-center justify-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Shopping Cart

                    <span className="ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#2EC4CC] px-1 text-xs font-bold text-[#001C3C]">
                      {cartCount}
                    </span>
                  </Link>
                </Button>

                {/* Login */}
                <Button
                  asChild
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-full bg-[#0056B3] font-sans text-base font-semibold text-white transition-colors hover:bg-[#004494] active:bg-[#003A7D]"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
