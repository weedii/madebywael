"use client";

import React, { useState, useEffect } from "react";
import { Save, RefreshCw } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
  id: string;
  title: string;
  description: string;
  favicon?: string;
  themeColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  aboutPageContent?: string;
  resumeFile?: string;
  updatedAt: Date;
}

type SiteSettingsFormData = Omit<SiteSettings, "id" | "updatedAt">;

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<SiteSettingsFormData>({
    title: "",
    description: "",
    favicon: "",
    themeColors: {
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#06b6d4",
    },
    aboutPageContent: "",
    resumeFile: "",
  });

  // Load settings
  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to load settings");
      const data = await response.json();

      if (data.length > 0) {
        const settingsData = data[0];
        setSettings(settingsData);
        setFormData({
          title: settingsData.title || "",
          description: settingsData.description || "",
          favicon: settingsData.favicon || "",
          themeColors: settingsData.themeColors || {
            primary: "#3b82f6",
            secondary: "#64748b",
            accent: "#06b6d4",
          },
          aboutPageContent: settingsData.aboutPageContent || "",
          resumeFile: settingsData.resumeFile || "",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load site settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Handle form field changes
  const handleInputChange = (field: keyof SiteSettingsFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle theme color changes
  const handleColorChange = (
    colorKey: keyof NonNullable<SiteSettingsFormData["themeColors"]>,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      themeColors: {
        ...prev.themeColors!,
        [colorKey]: value,
      },
    }));
  };

  // Save settings
  const handleSaveSettings = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url = settings ? `/api/settings/${settings.id}` : "/api/settings";
      const method = settings ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      toast({
        title: "Success",
        description: "Site settings saved successfully",
      });

      loadSettings(); // Reload to get updated data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save site settings",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading site settings...</div>
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
            <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
            <p className="text-muted-foreground">
              Manage your website's general configuration and appearance
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={loadSettings}
              disabled={isSubmitting}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={handleSaveSettings} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Configure your website's basic information and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Site Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Your Website Title"
                  />
                </div>
                <div>
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <Input
                    id="favicon"
                    value={formData.favicon}
                    onChange={(e) =>
                      handleInputChange("favicon", e.target.value)
                    }
                    placeholder="/favicon.ico"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Site Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="A brief description of your website for SEO and social sharing"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Theme Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Colors</CardTitle>
              <CardDescription>
                Customize your website's color scheme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2 items-center mt-1">
                    <Input
                      id="primary-color"
                      type="color"
                      value={formData.themeColors?.primary}
                      onChange={(e) =>
                        handleColorChange("primary", e.target.value)
                      }
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={formData.themeColors?.primary}
                      onChange={(e) =>
                        handleColorChange("primary", e.target.value)
                      }
                      placeholder="#3b82f6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2 items-center mt-1">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={formData.themeColors?.secondary}
                      onChange={(e) =>
                        handleColorChange("secondary", e.target.value)
                      }
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={formData.themeColors?.secondary}
                      onChange={(e) =>
                        handleColorChange("secondary", e.target.value)
                      }
                      placeholder="#64748b"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2 items-center mt-1">
                    <Input
                      id="accent-color"
                      type="color"
                      value={formData.themeColors?.accent}
                      onChange={(e) =>
                        handleColorChange("accent", e.target.value)
                      }
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={formData.themeColors?.accent}
                      onChange={(e) =>
                        handleColorChange("accent", e.target.value)
                      }
                      placeholder="#06b6d4"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>
                Configure your website's content and documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-content">About Page Content</Label>
                <Textarea
                  id="about-content"
                  value={formData.aboutPageContent}
                  onChange={(e) =>
                    handleInputChange("aboutPageContent", e.target.value)
                  }
                  placeholder="Content that will be displayed on your about page"
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="resume-file">Resume File URL</Label>
                <Input
                  id="resume-file"
                  value={formData.resumeFile}
                  onChange={(e) =>
                    handleInputChange("resumeFile", e.target.value)
                  }
                  placeholder="/files/resume.pdf"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL to your resume file (PDF recommended)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview how your settings will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 space-y-2">
                <h3
                  className="font-semibold text-lg"
                  style={{ color: formData.themeColors?.primary }}
                >
                  {formData.title || "Your Website Title"}
                </h3>
                <p className="text-muted-foreground">
                  {formData.description ||
                    "Your website description will appear here"}
                </p>
                <div className="flex gap-2 mt-3">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: formData.themeColors?.primary }}
                    title="Primary Color"
                  />
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: formData.themeColors?.secondary }}
                    title="Secondary Color"
                  />
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: formData.themeColors?.accent }}
                    title="Accent Color"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
