"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FileText,
  FolderKanban,
  HardDrive,
  Settings,
  UserCircle,
  Users,
  BookOpen,
  Briefcase,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/admin-layout";

export default function AdminDashboard() {
  const { data: session } = useSession();

  const stats = [
    {
      title: "Total Blog Posts",
      value: "12",
      description: "3 published in the last month",
      icon: <BookOpen className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Total Projects",
      value: "8",
      description: "2 new projects this month",
      icon: <Briefcase className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Website Visits",
      value: "4,289",
      description: "15% increase from last month",
      icon: <BarChart3 className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Form Submissions",
      value: "24",
      description: "From contact form",
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
  ];

  const quickLinks = [
    {
      title: "Manage Blog Posts",
      description: "Create, edit, and delete blog posts",
      icon: <FileText className="h-8 w-8" />,
      href: "/admin/blogs",
    },
    {
      title: "Manage Projects",
      description: "Create, edit, and delete projects",
      icon: <FolderKanban className="h-8 w-8" />,
      href: "/admin/projects",
    },
    {
      title: "Site Settings",
      description: "Manage website settings and content",
      icon: <Settings className="h-8 w-8" />,
      href: "/admin/settings",
    },
    {
      title: "Personal Info",
      description: "Update your personal information",
      icon: <UserCircle className="h-8 w-8" />,
      href: "/admin/settings/personal",
    },
    {
      title: "Contact Info",
      description: "Update your contact information",
      icon: <HardDrive className="h-8 w-8" />,
      href: "/admin/settings/contact",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name || "Admin"}
            </p>
          </div>
          <div>
            <Button asChild>
              <Link href="/">View Website</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link, index) => (
              <Card key={index} className="overflow-hidden">
                <Link href={link.href} className="block h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      <CardTitle>{link.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{link.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Recent actions performed on the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Updated Personal Info</p>
                    <p className="text-sm text-muted-foreground">
                      Changed profile picture and bio
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Published New Blog Post</p>
                    <p className="text-sm text-muted-foreground">
                      "Building a Type-Safe API with tRPC and Next.js"
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Added New Project</p>
                    <p className="text-sm text-muted-foreground">
                      "E-commerce Platform"
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Updated Site Settings</p>
                    <p className="text-sm text-muted-foreground">
                      Changed site title and description
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
