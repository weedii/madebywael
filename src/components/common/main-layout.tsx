import React from "react";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { ScrollToTop } from "@/components/common/scroll-to-top";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
