"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

import { MainLayout } from "@/components/common/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function AboutPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-24 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px] items-center">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Me
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Software engineer passionate about creating beautiful,
                  functional, and accessible web experiences.
                </p>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  I'm Wael, a software engineer with a focus on modern web
                  technologies. With several years of experience in both
                  frontend and backend development, I specialize in building
                  scalable, performant applications using React, Next.js,
                  Node.js, and various database technologies.
                </p>
                <p className="leading-relaxed">
                  My passion lies in crafting intuitive user experiences that
                  are both beautiful and accessible. I believe in writing clean,
                  maintainable code and following best practices to create
                  applications that stand the test of time.
                </p>
                <p className="leading-relaxed">
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through blog posts and community engagement.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1596075780750-81249df16d19?q=80&w=1587&auto=format&fit=crop"
                  alt="Wael - Software Engineer"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 md:py-24 bg-muted/50 flex justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Skills & Expertise
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Here are some of the technologies and tools I specialize in
              </p>
            </div>
          </motion.div>

          <div className="mx-auto max-w-5xl py-12">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              <motion.div variants={fadeIn}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Frontend Development
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        React & Next.js
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        TypeScript
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Tailwind CSS
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Redux & State Management
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Responsive Web Design
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Backend Development
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Node.js & Express
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        MongoDB & Mongoose
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        PostgreSQL & MySQL
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        RESTful API Design
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        GraphQL
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">DevOps & Tools</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Git & GitHub
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Docker & Containerization
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        AWS & Cloud Services
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        CI/CD Pipelines
                      </li>
                      <li className="flex items-center">
                        <span className="bg-primary/10 text-primary p-1 rounded-full mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        Vercel & Netlify
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-12 md:py-24 flex justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl text-center space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Let's Connect
            </h2>
            <p className="text-muted-foreground md:text-xl">
              I'm always open to new opportunities and collaborations. Feel free
              to reach out!
            </p>
            <div className="flex justify-center gap-4 pt-6">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Link href="mailto:contact@madebywael.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
            <div className="pt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
