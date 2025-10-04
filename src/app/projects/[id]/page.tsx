"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { MainLayout } from "@/components/common/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Project {
  _id: string;
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

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/projects/${id}`);

        if (response.ok) {
          const data = await response.json();
          // Only show published projects on public page
          if (data.published) {
            setProject(data);
          } else {
            setError("Project not found");
          }
        } else if (response.status === 404) {
          setError("Project not found");
        } else {
          setError("Failed to load project");
        }
      } catch (error) {
        console.error("Error loading project:", error);
        setError("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id]);

  // Image navigation
  const nextImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev >= project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project && project.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev <= 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowLeft className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Get display images (cover image + additional images)
  const displayImages = project.coverImage
    ? [project.coverImage, ...project.images]
    : project.images;

  return (
    <MainLayout>
      {/* Back Navigation */}
      <section className="py-6">
        <div className="container px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={slideIn}>
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {project.title}
                  </h1>
                  {project.featured && (
                    <Badge className="text-xs">Featured</Badge>
                  )}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-xl text-muted-foreground max-w-3xl">
                {project.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {project.publishedAt
                    ? new Date(project.publishedAt).toLocaleDateString()
                    : new Date(project.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Last updated{" "}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Images */}
      {displayImages.length > 0 && (
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto max-w-4xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg flex items-center justify-center">
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {displayImages.map((img, idx) => (
                            <CarouselItem
                              key={idx}
                              className="w-full h-96 md:h-[500px] flex items-center justify-center"
                            >
                              <div className="relative w-full h-96 md:h-[500px]">
                                <Image
                                  src={img}
                                  alt={`${project.title} - Image ${idx + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                  priority={idx === 0}
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
                        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
                      </Carousel>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>About This Project</CardTitle>
                <CardDescription>
                  Detailed information about the development process and
                  features
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
                <div
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  View All Projects
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
