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
  Twitter,
  CheckCircle,
} from "lucide-react";

import { MainLayout } from "@/components/common/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Interfaces for the data
interface PersonalInfo {
  id: string;
  name: string;
  bio: string;
  profilePicture: string;
  skills: string[];
  experience: string;
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
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load personal info and settings
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [personalResponse, settingsResponse] = await Promise.all([
          fetch("/api/personal"),
          fetch("/api/settings"),
        ]);

        if (personalResponse.ok) {
          const personalData = await personalResponse.json();
          if (personalData.length > 0) {
            setPersonalInfo(personalData[0]); // Get the first record
          }
        }

        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json();
          if (settingsData.length > 0) {
            setSettings(settingsData[0]); // Get the first record
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

  // Group skills by categories for better organization
  const categorizeSkills = (skills: string[]) => {
    const frontend = skills.filter((skill) =>
      [
        "React",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "HTML",
        "CSS",
      ].includes(skill)
    );
    const backend = skills.filter((skill) =>
      [
        "Node.js",
        "Python",
        "Java",
        "MongoDB",
        "PostgreSQL",
        "Express",
        "FastAPI",
        "Spring Boot",
      ].includes(skill)
    );
    const tools = skills.filter(
      (skill) => !frontend.includes(skill) && !backend.includes(skill)
    );

    return { frontend, backend, tools };
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
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
                  About {personalInfo?.name || "Wael Abidi"}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {personalInfo?.bio ||
                    "Full-stack Developer passionate about building scalable web applications with modern technologies and delivering exceptional user experiences."}
                </p>
              </div>
              <div className="space-y-4">
                {settings?.aboutPageContent && (
                  <p className="leading-relaxed">{settings.aboutPageContent}</p>
                )}

                {personalInfo?.experience && (
                  <p className="leading-relaxed">{personalInfo.experience}</p>
                )}

                {!settings?.aboutPageContent && !personalInfo?.experience && (
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

                {personalInfo?.skills && personalInfo.skills.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold mb-3">
                      Core Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {personalInfo.skills.slice(0, 8).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {personalInfo.skills.length > 8 && (
                        <Badge variant="outline" className="text-sm">
                          +{personalInfo.skills.length - 8} more
                        </Badge>
                      )}
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
            {personalInfo?.skills && personalInfo.skills.length > 0 ? (
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
                {(() => {
                  const { frontend, backend, tools } = categorizeSkills(
                    personalInfo.skills
                  );
                  return (
                    <>
                      {/* Frontend Skills */}
                      {frontend.length > 0 && (
                        <motion.div variants={fadeIn}>
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-4">
                                Frontend Development
                              </h3>
                              <div className="space-y-3">
                                {frontend.map((skill) => (
                                  <div
                                    key={skill}
                                    className="flex items-center"
                                  >
                                    <CheckCircle className="h-4 w-4 text-primary mr-3" />
                                    <span className="text-sm">{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {/* Backend Skills */}
                      {backend.length > 0 && (
                        <motion.div variants={fadeIn}>
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-4">
                                Backend Development
                              </h3>
                              <div className="space-y-3">
                                {backend.map((skill) => (
                                  <div
                                    key={skill}
                                    className="flex items-center"
                                  >
                                    <CheckCircle className="h-4 w-4 text-primary mr-3" />
                                    <span className="text-sm">{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {/* Other Tools & Technologies */}
                      {tools.length > 0 && (
                        <motion.div variants={fadeIn}>
                          <Card>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-bold mb-4">
                                Tools & Technologies
                              </h3>
                              <div className="space-y-3">
                                {tools.map((skill) => (
                                  <div
                                    key={skill}
                                    className="flex items-center"
                                  >
                                    <CheckCircle className="h-4 w-4 text-primary mr-3" />
                                    <span className="text-sm">{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}

                      {/* If we have less than 3 categories, show all skills in one card */}
                      {frontend.length === 0 &&
                        backend.length === 0 &&
                        tools.length > 0 && (
                          <motion.div
                            variants={fadeIn}
                            className="md:col-span-2 lg:col-span-3"
                          >
                            <Card>
                              <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">
                                  Skills & Technologies
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {personalInfo.skills.map((skill) => (
                                    <div
                                      key={skill}
                                      className="flex items-center"
                                    >
                                      <CheckCircle className="h-4 w-4 text-primary mr-3" />
                                      <span className="text-sm">{skill}</span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                    </>
                  );
                })()}
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
                {/* Fallback static skills when no data is available */}
                <motion.div variants={fadeIn}>
                  <Card>
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
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Link
                  href="https://github.com/weedii"
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
                <Link href="mailto:abidwael293@gmail.com">
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
