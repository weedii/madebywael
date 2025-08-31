"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  X,
  CheckCircle,
} from "lucide-react";

import { MainLayout } from "@/components/common/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Interfaces for the data

interface Skills {
  id: string;
  languages: string[];
  frameworksAndStack: string[];
  toolsAndServices: string[];
  updatedAt: string;
  createdAt: string;
}

interface Settings {
  id: string;
  title: string;
  description: string;
  aboutPageContent: string;
  resumeFile: string;
  updatedAt: string;
  createdAt: string;
}

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
  const [settings, setSettings] = useState<Settings | null>(null);
  const [skills, setSkills] = useState<Skills | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings, skills, and user profile
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [settingsResponse, skillsResponse, usersResponse] =
          await Promise.all([
            fetch("/api/settings"),
            fetch("/api/skills"),
            fetch("/api/users"),
          ]);

        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          if (settingsData.length > 0) {
            setSettings(settingsData[0]); // Get the first record
          }
        }

        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          if (skillsData.length > 0) {
            setSkills(skillsData[0]); // Get the first record
          }
        }

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          if (usersData.length > 0) {
            setUserProfile(usersData[0]); // Get the first user (admin)
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-24 flex justify-center">
        <div className="container px-4 md:px-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px] items-center">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About {userProfile?.fullName || "Wael Abidi"}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {userProfile?.bio ||
                    "Full-stack Developer passionate about building scalable web applications with modern technologies and delivering exceptional user experiences."}
                </p>
              </div>
              <div className="space-y-4">
                {settings?.aboutPageContent && (
                  <p className="leading-relaxed">{settings.aboutPageContent}</p>
                )}

                {!settings?.aboutPageContent && (
                  <>
                    <p className="leading-relaxed">
                      I'm a dedicated full-stack developer with professional
                      experience in both frontend and backend development. I
                      specialize in building robust applications using modern
                      web technologies and development practices.
                    </p>
                    <p className="leading-relaxed">
                      My expertise spans across multiple technologies, and I'm
                      passionate about creating efficient solutions and
                      comprehensive web applications. I believe in writing
                      clean, maintainable code that follows industry best
                      practices.
                    </p>
                  </>
                )}

                {skills &&
                  (skills.languages.length > 0 ||
                    skills.frameworksAndStack.length > 0 ||
                    skills.toolsAndServices.length > 0) && (
                    <div className="pt-4">
                      <h3 className="text-lg font-semibold mb-3">
                        Core Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...skills.languages.slice(0, 4),
                          ...skills.frameworksAndStack.slice(0, 4),
                        ].map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm"
                          >
                            {skill}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-sm">
                          +more
                        </Badge>
                      </div>
                    </div>
                  )}
              </div>
              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href={settings?.resumeFile || "/wael_abidi.pdf"} download>
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
                  src="/me.jpg"
                  alt="Wael Abidi - Full-stack Developer"
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
            {skills ? (
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
                {/* Programming Languages */}
                <motion.div variants={fadeIn}>
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                        Programming Languages
                      </h3>
                      <div className="space-y-3 flex-1">
                        {skills.languages.length > 0 ? (
                          skills.languages.map((skill) => (
                            <div key={skill} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-primary mr-3" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            No languages added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Frameworks & Stack */}
                <motion.div variants={fadeIn}>
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">
                        Frameworks & Stack
                      </h3>
                      <div className="space-y-3 flex-1">
                        {skills.frameworksAndStack.length > 0 ? (
                          skills.frameworksAndStack.map((skill) => (
                            <div key={skill} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-primary mr-3" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            No frameworks added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tools & Services */}
                <motion.div variants={fadeIn}>
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                        Tools & Services
                      </h3>
                      <div className="space-y-3 flex-1">
                        {skills.toolsAndServices.length > 0 ? (
                          skills.toolsAndServices.map((skill) => (
                            <div key={skill} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-primary mr-3" />
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            No tools added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ) : (
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
                {/* Fallback when no skills data is available */}
                <motion.div variants={fadeIn}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">
                        Skills & Technologies
                      </h3>
                      <p className="text-muted-foreground">
                        Skills information will be loaded from the database.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
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
              {userProfile?.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <Link
                    href={userProfile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              )}
              {userProfile?.linkedinUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <Link
                    href={userProfile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              )}
              {userProfile?.xUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <Link
                    href={userProfile.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">X</span>
                  </Link>
                </Button>
              )}
              {userProfile?.publicEmail && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <Link href={`mailto:${userProfile.publicEmail}`}>
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              )}
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
