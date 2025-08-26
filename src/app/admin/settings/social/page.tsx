"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ExternalLink,
} from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";

interface SocialLinks {
  id: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  updatedAt: Date;
}

type SocialLinksFormData = Omit<SocialLinks, "id" | "updatedAt">;

const socialPlatforms = [
  {
    key: "github" as keyof SocialLinksFormData,
    label: "GitHub",
    icon: Github,
    placeholder: "https://github.com/yourusername",
    description:
      "Your GitHub profile showcasing your repositories and contributions",
  },
  {
    key: "linkedin" as keyof SocialLinksFormData,
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "https://linkedin.com/in/yourusername",
    description: "Your professional LinkedIn profile",
  },
  {
    key: "twitter" as keyof SocialLinksFormData,
    label: "Twitter",
    icon: Twitter,
    placeholder: "https://twitter.com/yourusername",
    description: "Your Twitter profile for updates and thoughts",
  },
  {
    key: "instagram" as keyof SocialLinksFormData,
    label: "Instagram",
    icon: Instagram,
    placeholder: "https://instagram.com/yourusername",
    description: "Your Instagram profile for personal updates and visuals",
  },
];

export default function SocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<SocialLinksFormData>({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  // Load social links
  const loadSocialLinks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/social");
      if (!response.ok) throw new Error("Failed to load social links");
      const data = await response.json();

      if (data.length > 0) {
        const socialData = data[0];
        setSocialLinks(socialData);
        setFormData({
          github: socialData.github || "",
          linkedin: socialData.linkedin || "",
          twitter: socialData.twitter || "",
          instagram: socialData.instagram || "",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load social links",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSocialLinks();
  }, []);

  // Handle form field changes
  const handleInputChange = (
    field: keyof SocialLinksFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate URL format
  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty URLs are valid (optional fields)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Save social links
  const handleSaveSocialLinks = async () => {
    // Validate all URLs
    const invalidUrls: string[] = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (value && !isValidUrl(value)) {
        invalidUrls.push(
          socialPlatforms.find((p) => p.key === key)?.label || key
        );
      }
    });

    if (invalidUrls.length > 0) {
      toast({
        title: "Validation Error",
        description: `Invalid URLs for: ${invalidUrls.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url = socialLinks ? `/api/social/${socialLinks.id}` : "/api/social";
      const method = socialLinks ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save social links");

      toast({
        title: "Success",
        description: "Social links saved successfully",
      });

      loadSocialLinks(); // Reload to get updated data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save social links",
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
          <div className="text-muted-foreground">Loading social links...</div>
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
            <h2 className="text-3xl font-bold tracking-tight">Social Links</h2>
            <p className="text-muted-foreground">
              Manage your social media profiles and online presence
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={loadSocialLinks}
              disabled={isSubmitting}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={handleSaveSocialLinks} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Social Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Profiles</CardTitle>
              <CardDescription>
                Add links to your social media profiles and professional
                networks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                const value = formData[platform.key] || "";
                const isValid = isValidUrl(value);

                return (
                  <div key={platform.key} className="space-y-2">
                    <Label
                      htmlFor={platform.key}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {platform.label}
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={platform.key}
                          type="url"
                          value={value}
                          onChange={(e) =>
                            handleInputChange(platform.key, e.target.value)
                          }
                          placeholder={platform.placeholder}
                          className={`pl-10 ${
                            !isValid && value ? "border-destructive" : ""
                          }`}
                        />
                      </div>
                      {value && isValid && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {platform.description}
                    </p>
                    {!isValid && value && (
                      <p className="text-xs text-destructive">
                        Please enter a valid URL starting with http:// or
                        https://
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
              <CardDescription>
                Best practices for your social media links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    Use complete URLs including https:// for better
                    compatibility
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    Keep your profiles updated and active for better
                    professional presence
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    Consider using professional profile pictures across all
                    platforms
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>
                    Leave fields empty if you don't have accounts on those
                    platforms
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview how your social links will appear on your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    const url = formData[platform.key];

                    if (!url || !isValidUrl(url)) return null;

                    return (
                      <a
                        key={platform.key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-muted transition-colors"
                        title={platform.label}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">
                          {platform.label}
                        </span>
                      </a>
                    );
                  })}
                </div>

                {!Object.values(formData).some(
                  (url) => url && isValidUrl(url)
                ) && (
                  <p className="text-muted-foreground text-center py-4">
                    No social links configured yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
