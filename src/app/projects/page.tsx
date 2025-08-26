"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Search, ExternalLink, Github } from "lucide-react";

import { MainLayout } from "@/components/common/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  images: string[];
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  published: boolean;
  publishedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          // Only show published projects on the public page
          const publishedProjects = data.filter(
            (project: Project) => project.published
          );
          setProjects(publishedProjects);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Get all unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  // Filter projects based on search query and selected technology
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTech =
      !selectedTech || project.technologies.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-muted/50 py-12 md:py-24 flex justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-3xl space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              My Projects
            </h1>
            <p className="text-muted-foreground md:text-xl">
              A collection of software engineering projects I've worked on
            </p>
            {projects.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {projects.length} project{projects.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter Section - Only show if there are projects */}
      {projects.length > 0 && (
        <section className="py-8 md:py-12 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {allTechnologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedTech === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTech(null)}
                  >
                    All
                  </Button>
                  {allTechnologies.map((tech) => (
                    <Button
                      key={tech}
                      variant={selectedTech === tech ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTech(tech)}
                    >
                      {tech}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="py-8 md:py-12 flex justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeIn}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="relative"
                >
                  <div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 blur-md animate-float"
                    style={{ animationDelay: `${parseInt(project.id) * 0.2}s` }}
                  ></div>

                  <Card className="overflow-hidden h-full flex flex-col border-none relative">
                    {project.coverImage && (
                      <div className="relative h-48">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Hide image container if image fails to load
                            const target = e.target as HTMLElement;
                            const container = target.closest(
                              ".relative"
                            ) as HTMLElement;
                            if (container) {
                              container.style.display = "none";
                            }
                          }}
                        />
                        {project.featured && (
                          <Badge className="absolute top-2 right-2">
                            Featured
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{project.title}</span>
                        {project.featured && !project.coverImage && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link href={`/projects/${project.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : projects.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No Projects Yet
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Projects will appear here once they are published. Check
                    back soon!
                  </p>
                </div>
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No Projects Found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    No projects match your current filters. Try adjusting your
                    search.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTech(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
