"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";

const routes = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 flex justify-center ${
      scrolled ? "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm" : "bg-background/50 backdrop-blur-sm"
    }`}>
      <div className="container flex h-16 items-center justify-between mx-5">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center group">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:scale-105 transition-transform duration-300">madebywael</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {routes.map((route, index) => (
                <NavigationMenuItem key={route.path}>
                  <Link href={route.path} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${pathname === route.path ? 'text-primary font-medium bg-primary/10' : ''} rounded-full`}
                      active={pathname === route.path}
                    >
                      {route.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </motion.nav>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full glass-effect hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container pt-6 pb-12 flex flex-col gap-4">
            {routes.map((route, index) => (
              <motion.div
                key={route.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={route.path}
                  className={`px-5 py-3 text-lg font-medium transition-all duration-200 rounded-full flex items-center ${
                    pathname === route.path 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-accent hover:pl-7"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.name}
                  {pathname === route.path && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
