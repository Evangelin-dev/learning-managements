import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Bell, ExternalLink, LogOut, Search, User } from "lucide-react";
import type { ReactNode } from "react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type NavItem = { to: string; label: string; icon: LucideIcon; exact?: boolean };

type Props = {
  nav: NavItem[];
  groupLabel: string;
  user: { name: string; email: string; initials: string };
  profileTo: string;
  children: ReactNode;
};

export function AppShell({ nav, groupLabel, user, profileTo, children }: Props) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <ShellSidebar nav={nav} groupLabel={groupLabel} />
        <SidebarInset className="min-w-0 bg-background">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6">
            <SidebarTrigger />
            <div className="relative hidden max-w-sm flex-1 md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="bg-background pl-9" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/"><ExternalLink />View site</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-teal" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex-col items-start"><span className="text-sm font-medium">New order ORD-10482</span><span className="text-xs text-muted-foreground">Complete React Developer · 2h ago</span></DropdownMenuItem>
                  <DropdownMenuItem className="flex-col items-start"><span className="text-sm font-medium">Refund requested</span><span className="text-xs text-muted-foreground">ORD-10476 · 1d ago</span></DropdownMenuItem>
                  <DropdownMenuItem className="flex-col items-start"><span className="text-sm font-medium">Video processed</span><span className="text-xs text-muted-foreground">“Deploying the project” is ready</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full p-0.5 pr-2 hover:bg-accent">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{user.initials}</span>
                    <span className="hidden text-sm font-medium sm:inline">{user.name.split(" ")[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <span className="block text-sm">{user.name}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to={profileTo}><User />Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/login"><LogOut />Log out</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function ShellSidebar({ nav, groupLabel }: { nav: NavItem[]; groupLabel: string }) {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (item: NavItem) => (item.exact ? path === item.to : path === item.to || path.startsWith(item.to + "/"));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-1">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-gradient font-script text-xl font-bold text-primary-foreground">V</span>
          {!collapsed && <span className="font-script text-2xl font-bold text-primary">Vilaiyosai</span>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item)} tooltip={item.label} className="h-10 data-[active=true]:font-semibold">
                    <Link to={item.to} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Log out">
              <Link to="/login"><LogOut /><span>Log out</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
