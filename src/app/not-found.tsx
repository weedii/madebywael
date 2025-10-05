"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Mail, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-background h-screen flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] dark:opacity-[0.04]"></div>

      {/* Animated Background Blobs */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-float"></div>
      <div
        className="absolute bottom-20 left-[5%] w-64 h-64 bg-primary/15 rounded-full blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="container px-4 md:px-6 relative z-10 max-w-4xl">
        <motion.div
          className="text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* 404 Number with Animation */}
          <motion.div variants={fadeIn} className="relative">
            <motion.h1
              className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-gradient leading-none"
              animate={floatAnimation}
            >
              404
            </motion.h1>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full blur-sm"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>

          {/* Main Message */}
          <motion.div variants={fadeIn} className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Oops! Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, even the best explorers sometimes take
              a wrong turn.
            </p>
          </motion.div>

          {/* Main Action Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button asChild size="lg" className="gap-2 group rounded-full">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 group rounded-full"
              onClick={() => window.history.back()}
            >
              <button>
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </Button>
          </motion.div>

          {/* Fun Error Message */}
          <motion.div variants={fadeIn} className="pt-8">
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm bg-primary/10 text-primary glass-effect">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary"></span>
              Error 404: Page escaped to another dimension
            </div>
          </motion.div>

          {/* Floating Emoji Decorations */}
          <div className="absolute top-1/4 left-1/4 text-4xl opacity-20">
            <motion.span
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🚀
            </motion.span>
          </div>

          <div className="absolute top-1/3 right-1/4 text-3xl opacity-20">
            <motion.span
              animate={{
                y: [0, -15, 0],
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              🔍
            </motion.span>
          </div>

          <div className="absolute bottom-1/4 left-1/3 text-3xl opacity-20">
            <motion.span
              animate={{
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              💫
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
