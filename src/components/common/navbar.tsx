"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

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
import Image from "next/image";

const routes = [
  { name: "Home", path: "/" },
  // { name: "Blog", path: "/blog" },
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
    <header
      className={`sticky top-0 z-50 w-full border-b border-primary transition-all duration-300 flex justify-center ${
        scrolled
          ? "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between mx-5 max-w-7xl">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex items-center justify-center group">
            <Image
              src="/wa.png"
              alt="Logo"
              width={40}
              height={40}
              className="mt-1 group-hover:scale-110 transition-transform duration-300"
            />

            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-600 group-hover:scale-105 transition-transform duration-300">
              madebywael
            </span>
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
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === route.path
                          ? "text-primary font-medium bg-primary/10"
                          : ""
                      } rounded-full`}
                      active={pathname === route.path}
                    >
                      {route.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* <ThemeToggle /> */}
        </motion.nav>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-4">
          {/* <ThemeToggle /> */}

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
          className="md:hidden fixed inset-0 top-16 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="h-full flex flex-col"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1 px-6 py-8 bg-gray-100 dark:bg-zinc-950">
              <nav className="space-y-3">
                {routes.map((route, index) => (
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={route.path}
                      className={`group flex items-center justify-between px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200 ${
                        pathname === route.path
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "hover:bg-accent/50 hover:translate-x-2"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{route.name}</span>
                      {pathname === route.path ? (
                        <motion.div
                          className="h-2 w-2 rounded-full bg-primary"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        />
                      ) : (
                        <motion.div
                          className="h-1 w-6 bg-muted-foreground/30 rounded-full group-hover:bg-primary/50 transition-colors"
                          whileHover={{ width: 32 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Footer section */}
            <motion.div
              className="border-t border-primary/20 bg-gray-200 dark:bg-zinc-950 px-6 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <p className="text-sm text-muted-foreground text-center">
                Made with ❤️ by Wael
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
