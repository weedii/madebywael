"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadResumeButtonProps {
  resumePath?: string;
  fileName?: string;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function DownloadResumeButton({
  resumePath = "/wael_abidi.pdf",
  fileName = "wael_abidi.pdf",
  variant = "outline",
  size = "lg",
  className = "",
}: DownloadResumeButtonProps) {
  const handleDownload = () => {
    // Download the file
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open in new tab
    window.open(resumePath, "_blank");
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`group rounded-full gap-2 flex items-center ${className}`}
      onClick={handleDownload}
    >
      Download Resume
      <motion.span
        animate={{ y: [0, -3, 0] }}
        transition={{
          repeat: Infinity,
          repeatDelay: 0.1,
          duration: 0.5,
        }}
      >
        <Download className="h-4 w-4" />
      </motion.span>
    </Button>
  );
}
