"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 text-white shadow-md hover:bg-primary hover:shadow-primary/20 border border-primary/20 transition-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
            >
              <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 