"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FileText,
  FolderKanban,
  Settings,
  UserCircle,
  BookOpen,
  Briefcase,
  BarChart3,
  Plus,
  TrendingUp,
  Clock,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    publishedProjects: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        // Load blogs and projects data
        const [blogsResponse, projectsResponse] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/projects"),
        ]);

        if (blogsResponse.ok && projectsResponse.ok) {
          const blogs = await blogsResponse.json();
          const projects = await projectsResponse.json();

          // Calculate stats
          setStats({
            totalBlogs: blogs.length,
            publishedBlogs: blogs.filter((blog: any) => blog.published).length,
            totalProjects: projects.length,
            publishedProjects: projects.filter(
              (project: any) => project.published
            ).length,
          });

          // Get recent items (last 5)
          const sortedBlogs = blogs
            .sort(
              (a: any, b: any) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .slice(0, 3);
          const sortedProjects = projects
            .sort(
              (a: any, b: any) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .slice(0, 3);

          setRecentBlogs(sortedBlogs);
          setRecentProjects(sortedProjects);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const quickActions = [
    {
      title: "New Blog Post",
      description: "Write and publish a new blog post",
      icon: <Plus className="h-5 w-5" />,
      href: "/admin/blogs",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "New Project",
      description: "Add a new project to your portfolio",
      icon: <Plus className="h-5 w-5" />,
      href: "/admin/projects",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "View Website",
      description: "See how your portfolio looks",
      icon: <Eye className="h-5 w-5" />,
      href: "/",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name || "Admin"}! Here's your
              portfolio overview.
            </p>
          </div>
          <Button asChild className="hidden md:flex">
            <Link href="/">
              <Eye className="mr-2 h-4 w-4" />
              View Website
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Blog Posts
              </CardTitle>
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {stats.totalBlogs}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {stats.publishedBlogs} published
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Projects
              </CardTitle>
              <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {stats.totalProjects}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                {stats.publishedProjects} published
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Portfolio Status
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                Active
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                Content up to date
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Last Updated
              </CardTitle>
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                Today
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Content freshness
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-auto p-4 justify-start group hover:scale-105 transition-all duration-200"
              >
                <Link href={action.href}>
                  <div
                    className={`p-2 rounded-md mr-3 text-white ${action.color} group-hover:shadow-lg transition-shadow`}
                  >
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Blog Posts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Blog Posts</CardTitle>
                <CardDescription>Your latest blog content</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/blogs">
                  <FileText className="h-4 w-4 mr-1" />
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentBlogs.length > 0 ? (
                <div className="space-y-3">
                  {recentBlogs.map((blog: any) => (
                    <div
                      key={blog._id}
                      className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{blog.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={blog.published ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {blog.published ? "Published" : "Draft"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(blog.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No blog posts yet</p>
                  <Button asChild size="sm" className="mt-2">
                    <Link href="/admin/blogs">Create your first post</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Projects</CardTitle>
                <CardDescription>Your latest portfolio work</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/projects">
                  <FolderKanban className="h-4 w-4 mr-1" />
                  View All
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {recentProjects.length > 0 ? (
                <div className="space-y-3">
                  {recentProjects.map((project: any) => (
                    <div
                      key={project._id}
                      className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{project.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={
                              project.published ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {project.published ? "Published" : "Draft"}
                          </Badge>
                          {project.featured && (
                            <Badge variant="outline" className="text-xs">
                              Featured
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No projects yet</p>
                  <Button asChild size="sm" className="mt-2">
                    <Link href="/admin/projects">Add your first project</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Settings Access */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Settings</CardTitle>
            <CardDescription>
              Quick access to configure your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                asChild
                variant="ghost"
                className="justify-start h-auto p-3"
              >
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Site Settings
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="justify-start h-auto p-3"
              >
                <Link href="/admin/settings/profile">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
