"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Book,
  Calendar,
  Dumbbell,
  LayoutDashboard,
  Settings,
  Wind,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

const habitIcons: { [key: string]: React.ElementType } = {
  book: Book,
  dumbbell: Dumbbell,
  zap: Zap,
  wind: Wind,
  default: Calendar,
};

export function getHabitIcon(iconName: string) {
  return habitIcons[iconName] || habitIcons.default;
}

function MainHeader({ title }: { title: string }) {
  const { isMobile } = useSidebar();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      {isMobile && (
        <SidebarTrigger className="h-8 w-8 -translate-x-2 [&_svg]:h-5 [&_svg]:w-5" />
      )}
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
    </header>
  );
}

export function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const pathname = usePathname();
  const avatarImage = PlaceHolderImages.find(
    (img) => img.id === "user-avatar-1",
  );

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Icons.Logo className="h-6 w-6 text-primary" />
            <span className="">Habitualize</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent">
                <Avatar className="h-8 w-8">
                  {avatarImage && (
                    <AvatarImage
                      src={avatarImage.imageUrl}
                      alt={avatarImage.description}
                      data-ai-hint={avatarImage.imageHint}
                    />
                  )}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">Jane Doe</span>
                  <span className="text-xs text-muted-foreground">
                    jane.doe@example.com
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="top" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          <MainHeader title={title} />
          <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
