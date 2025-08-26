"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  FileText,
  Github,
  Star,
  ExternalLink,
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

const latestPosts = [
  {
    id: "1",
    title: "Building a Type-Safe API with tRPC and Next.js",
    excerpt:
      "Learn how to create a fully type-safe API using tRPC in your Next.js applications for improved developer experience and fewer runtime errors.",
    publishedAt: "2023-04-15",
    slug: "type-safe-api-trpc-nextjs",
  },
  {
    id: "2",
    title: "Optimizing React Performance with Memo and useCallback",
    excerpt:
      "Dive deep into React's performance optimization techniques using React.memo, useMemo, and useCallback to prevent unnecessary renders.",
    publishedAt: "2023-03-22",
    slug: "react-performance-memo-usecallback",
  },
  {
    id: "3",
    title: "Implementing Authentication in Next.js Applications",
    excerpt:
      "A comprehensive guide to implementing secure authentication in your Next.js applications using NextAuth.js.",
    publishedAt: "2023-02-10",
    slug: "nextjs-authentication-guide",
  },
];

// Animations
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

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load featured projects from API
  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          // Get published and featured projects, limit to 6 for homepage
          const featured = data
            .filter((project: Project) => project.published && project.featured)
            .slice(0, 6);
          setFeaturedProjects(featured);
        }
      } catch (error) {
        console.error("Failed to load featured projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-20 md:py-32 flex justify-center ">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] dark:opacity-[0.04]"></div>
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-float"></div>
        <div
          className="absolute bottom-10 left-[5%] w-64 h-64 bg-primary/15 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="container px-4 md:px-6 relative z-10 max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-2 w-fit glass-effect">
                <span className="animate-pulse mr-1.5 h-2 w-2 rounded-full bg-primary"></span>{" "}
                Available for new projects
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-gradient">
                    Hi, I&apos;m Wael
                  </h1>
                  <p className="text-3xl md:text-5xl transform hover:rotate-12 transition-transform duration-300 hover:cursor-grab">
                    👋
                  </p>
                </div>

                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                  Software Engineer specialized in building{" "}
                  <span className="text-primary font-medium">beautiful</span>,{" "}
                  <span className="text-primary font-medium">accessible</span>,
                  and{" "}
                  <span className="text-primary font-medium">performant</span>{" "}
                  web applications with modern technologies.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                <Button asChild size="lg" className="gap-2 group rounded-full">
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="group rounded-full"
                >
                  <Link href="/contact" className="gap-2">
                    Contact Me
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatDelay: 2,
                        duration: 0.4,
                      }}
                    >
                      <Github className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
              </div>
              <div className="flex gap-5 pt-6 items-center">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-scale"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-scale"
                >
                  <FileText className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover-scale"
                >
                  <Code className="h-5 w-5" />
                </a>
                <div className="h-5 w-px bg-border mx-1"></div>
                <span className="text-sm text-muted-foreground">
                  Let's connect
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-md animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>

                <div className="absolute inset-4 rounded-full bg-card border shadow-lg glass-effect"></div>

                <Image
                  src="/me.jpg"
                  alt="Wael Profile"
                  fill
                  className="object-cover rounded-full p-2"
                  priority
                />

                <motion.div
                  className="absolute -bottom-4 -right-4 glass-effect px-4 py-2 rounded-full shadow-md flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="text-sm font-medium">
                    Full Stack Developer
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                </motion.div>

                <motion.div
                  className="absolute -top-2 -left-2 glass-effect p-2 rounded-full shadow-md"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <span className="text-2xl">💻</span>
                </motion.div>

                <motion.div
                  className="absolute top-1/4 -right-8 glass-effect p-2 rounded-full shadow-md"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <span className="text-2xl">🚀</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {/* <section className="py-20 md:py-28 bg-muted/30 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] dark:opacity-[0.03]"></div>
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary glass-effect">
              What I work with
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gradient">
                Skills & Technologies
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Technologies I've been working with recently
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 pt-12">
              {[
                { name: "TypeScript", icon: "📝", delay: 0 },
                { name: "React", icon: "⚛️", delay: 0.1 },
                { name: "Next.js", icon: "▲", delay: 0.2 },
                { name: "Node.js", icon: "🟢", delay: 0.3 },
                { name: "MongoDB", icon: "🍃", delay: 0.4 },
                { name: "Tailwind CSS", icon: "🌊", delay: 0.5 },
                { name: "GraphQL", icon: "📊", delay: 0.6 },
                { name: "Redux", icon: "🔄", delay: 0.7 },
                { name: "Express", icon: "🚂", delay: 0.8 },
                { name: "PostgreSQL", icon: "🐘", delay: 0.9 },
                { name: "AWS", icon: "☁️", delay: 1.0 },
                { name: "Git", icon: "🔄", delay: 1.1 },
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center justify-center rounded-xl glass-effect p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30 group"
                  whileHover={{ y: -5, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: skill.delay * 0.1,
                  }}
                >
                  <span className="text-2xl mb-2 group-hover:animate-bounce">
                    {skill.icon}
                  </span>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Featured Projects Section */}
      <section className="py-20 md:py-28 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] dark:opacity-[0.02]"></div>
        <div className="absolute left-0 top-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary glass-effect">
              <Star className="w-3 h-3 mr-1" />
              Featured Work
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gradient">
                Latest Projects
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Some of my recent work that I'm most proud of
              </p>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            </div>
          ) : featuredProjects.length > 0 ? (
            <>
              <motion.div
                className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-14 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeIn}
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col border-border/40 group-hover:border-primary/30 transition-all duration-300 glass-effect group-hover:shadow-lg group-hover:shadow-primary/10">
                      {project.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></div>
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Featured badge */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-primary/90 text-primary-foreground border-0">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          </div>

                          {/* Action buttons overlay removed for now*/}
                        </div>
                      )}

                      <CardHeader className="relative">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-gradient group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          {!project.coverImage && (
                            <Badge variant="secondary">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs px-2 py-0.5 transition-all duration-200 hover:bg-primary/10 hover:border-primary/30"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5"
                            >
                              +{project.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-2">
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full group/btn rounded-full hover:bg-primary/10"
                        >
                          <Link
                            href={`/projects/${project.id}`}
                            className="flex items-center justify-center gap-2"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <div className="flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group rounded-full"
                >
                  <Link href="/projects" className="flex items-center gap-2">
                    View All Projects
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No Featured Projects Yet
              </h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Featured projects will appear here once they are published and
                marked as featured.
              </p>
              <Button asChild variant="outline">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      {/* <section className="py-20 md:py-28 bg-muted/30 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] dark:opacity-[0.02]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary glass-effect">
              Blog
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gradient">
                Latest Blog Posts
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Technical articles and thoughts on web development
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-14 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={fadeIn}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="h-full flex flex-col border-border/40 group-hover:border-primary/30 transition-all duration-300 glass-effect relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl transform translate-x-8 -translate-y-8 group-hover:bg-primary/10 transition-colors duration-500"></div>

                  <CardHeader className="relative">
                    <div className="inline-flex items-center rounded-full px-2.5 py-1 text-xs glass-effect text-primary mb-2 w-fit">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <CardTitle className="text-gradient group-hover:translate-x-1 transition-transform duration-300">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pt-2 relative">
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full group rounded-full hover:bg-primary/10"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center justify-center gap-2"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group rounded-full"
            >
              <Link href="/blog" className="flex items-center gap-2">
                View All Posts
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 md:py-28 flex justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] dark:opacity-[0.02]"></div>
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto max-w-3xl space-y-6">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary glass-effect mx-auto">
                Get in touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gradient">
                Let&apos;s Work Together
              </h2>
              <div className="relative">
                <p className="text-muted-foreground md:text-xl leading-relaxed">
                  I'm currently available for freelance work and open to new
                  opportunities. If you have a project that you want to get
                  started or need help with, feel free to contact me.
                </p>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/10 rounded-full blur-lg animate-float"></div>
                <div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-primary/10 rounded-full blur-lg animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center pt-6">
                <Button asChild size="lg" className="gap-2 group rounded-full">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="gap-2 group rounded-full"
                >
                  <Link
                    href="https://github.com/weedii"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
