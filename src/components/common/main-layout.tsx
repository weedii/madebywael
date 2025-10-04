import React from "react";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { ScrollToTop } from "@/components/common/scroll-to-top";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={cn("flex-1 min-h-screen", className)}>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
