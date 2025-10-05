"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoLoading } from "@/contexts/auto-loading-context";

export function AutoLoader() {
  const { isLoading } = useAutoLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.02]"></div>

          {/* Animated Background Blobs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float"></div>
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[100px] animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Main Loader Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo/Brand Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-2xl font-bold text-white"
                >
                  W
                </motion.span>
              </div>

              {/* Pulsing Ring */}
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-64 h-1 bg-muted rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/3 bg-gradient-to-r from-primary to-primary/70 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
