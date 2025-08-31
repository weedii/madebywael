"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Blog Posts",
    href: "/admin/blogs",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: <Briefcase className="h-5 w-5" />,
  },

  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    submenu: [
      {
        title: "Site Settings",
        href: "/admin/settings",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        title: "Profile",
        href: "/admin/settings/profile",
        icon: <User className="h-4 w-4" />,
      },
      {
        title: "Skills",
        href: "/admin/settings/skills",
        icon: <Code2 className="h-5 w-5" />,
      },
    ],
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Auto-expand submenu if current path matches any submenu item
  React.useEffect(() => {
    sidebarNavItems.forEach((item) => {
      if (item.submenu) {
        const hasActiveSubitem = item.submenu.some(
          (subitem) => pathname === subitem.href
        );
        if (hasActiveSubitem) {
          setOpenSubmenu(item.title);
        }
      }
    });
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const isSubmenuActive = (submenu: Array<{ href: string }>) => {
    return submenu.some((subitem) => pathname === subitem.href);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-7 right-8 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 h-full bg-card border-r transition-all duration-300 ${
          mobileOpen ? "left-0" : "-left-full"
        } lg:left-0 ${collapsed ? "w-[80px]" : "w-[280px]"}`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="border-b px-6 py-4 flex items-center justify-between">
            {!collapsed && (
              <Link href="/admin" className="text-xl font-bold">
                Admin Panel
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <nav className="flex flex-col gap-2">
              {sidebarNavItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          isSubmenuActive(item.submenu) ? "bg-accent" : ""
                        }`}
                        onClick={() => toggleSubmenu(item.title)}
                      >
                        {item.icon}
                        {!collapsed && (
                          <>
                            <span className="ml-2">{item.title}</span>
                            <ChevronRight
                              className={`ml-auto h-4 w-4 transition-transform ${
                                openSubmenu === item.title ? "rotate-90" : ""
                              }`}
                            />
                          </>
                        )}
                      </Button>
                      {!collapsed && openSubmenu === item.title && (
                        <div className="ml-6 space-y-1">
                          {item.submenu.map((subitem, subindex) => (
                            <Button
                              key={subindex}
                              variant="ghost"
                              className={`w-full justify-start ${
                                pathname === subitem.href ? "bg-accent" : ""
                              }`}
                              asChild
                            >
                              <Link href={subitem.href}>
                                {subitem.icon}
                                <span className="ml-2">{subitem.title}</span>
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        isActive(item.href) ? "bg-accent" : ""
                      }`}
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {!collapsed && (
                          <span className="ml-2">{item.title}</span>
                        )}
                      </Link>
                    </Button>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t p-4">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                  <Home className="h-5 w-5" />
                  {!collapsed && <span className="ml-2">View Website</span>}
                </Link>
              </Button>
              {!collapsed ? (
                <div className="flex items-center justify-between">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2"
                      >
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-medium">
                            {session?.user?.name || "Admin"}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {session?.user?.email || "admin@example.com"}
                          </span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/settings/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ThemeToggle />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" size="icon" onClick={handleSignOut}>
                    <LogOut className="h-5 w-5" />
                    <span className="sr-only">Log out</span>
                  </Button>
                  <ThemeToggle />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
