"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Search, Tag } from "lucide-react";

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
import { redirect } from "next/navigation";

// Dummy data for blog posts
const posts = [
  {
    id: "1",
    title: "Building a Type-Safe API with tRPC and Next.js",
    excerpt:
      "Learn how to create a fully type-safe API using tRPC in your Next.js applications for improved developer experience and fewer runtime errors.",
    content: "Full content of the blog post...",
    publishedAt: "2023-04-15",
    slug: "type-safe-api-trpc-nextjs",
    tags: ["Next.js", "TypeScript", "API", "tRPC"],
    readingTime: "8 min",
  },
  {
    id: "2",
    title: "Optimizing React Performance with Memo and useCallback",
    excerpt:
      "Dive deep into React's performance optimization techniques using React.memo, useMemo, and useCallback to prevent unnecessary renders.",
    content: "Full content of the blog post...",
    publishedAt: "2023-03-22",
    slug: "react-performance-memo-usecallback",
    tags: ["React", "Performance", "JavaScript", "Hooks"],
    readingTime: "12 min",
  },
  {
    id: "3",
    title: "Implementing Authentication in Next.js Applications",
    excerpt:
      "A comprehensive guide to implementing secure authentication in your Next.js applications using NextAuth.js.",
    content: "Full content of the blog post...",
    publishedAt: "2023-02-10",
    slug: "nextjs-authentication-guide",
    tags: ["Next.js", "Authentication", "Security", "NextAuth"],
    readingTime: "15 min",
  },
  {
    id: "4",
    title: "Using Tailwind CSS Effectively in React Projects",
    excerpt:
      "Learn best practices for organizing and scaling Tailwind CSS in large React applications while maintaining clean and maintainable code.",
    content: "Full content of the blog post...",
    publishedAt: "2023-01-05",
    slug: "tailwind-css-react-best-practices",
    tags: ["React", "Tailwind CSS", "CSS", "Frontend"],
    readingTime: "10 min",
  },
  {
    id: "5",
    title: "Building a Serverless API with AWS Lambda and API Gateway",
    excerpt:
      "A step-by-step guide to creating scalable serverless APIs using AWS Lambda functions and API Gateway.",
    content: "Full content of the blog post...",
    publishedAt: "2022-12-20",
    slug: "serverless-api-aws-lambda",
    tags: ["AWS", "Serverless", "API", "Backend"],
    readingTime: "14 min",
  },
  {
    id: "6",
    title: "State Management in React: Context API vs. Redux",
    excerpt:
      "Compare different state management approaches in React applications and learn when to use Context API vs Redux.",
    content: "Full content of the blog post...",
    publishedAt: "2022-11-15",
    slug: "react-state-management-context-redux",
    tags: ["React", "State Management", "Redux", "Context API"],
    readingTime: "11 min",
  },
];

// All unique tags for filtering
const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

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

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts based on search query and selected tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = !selectedTag || post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  if (true) return redirect("/");

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
              Blog
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Thoughts, tutorials, and insights about web development and
              software engineering
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 md:py-12 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                All Topics
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 md:py-12 flex justify-center">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto grid max-w-3xl gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                <motion.div key={post.id} variants={fadeIn}>
                  <Card className="h-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No articles found matching your search.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
