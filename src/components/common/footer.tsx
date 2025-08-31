"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, X, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setUserProfile(data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <footer className="border-t bg-background flex justify-center px-5">
      <div className="container py-12 md:py-16 flex flex-col gap-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">madebywael</h3>
            <p className="text-muted-foreground max-w-md">
              {userProfile?.bio ||
                "Software engineer passionate about building beautiful, accessible, and performant web applications."}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li> */}
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex gap-4">
              {userProfile?.githubUrl && (
                <Link
                  href={userProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              )}
              {userProfile?.linkedinUrl && (
                <Link
                  href={userProfile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
              {userProfile?.xUrl && (
                <Link
                  href={userProfile.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">X</span>
                </Link>
              )}
              {userProfile?.publicEmail && (
                <Link
                  href={`mailto:${userProfile.publicEmail}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Made by Wael. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
