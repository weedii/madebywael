"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Save, Upload, User as UserIcon } from "lucide-react";
import Image from "next/image";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  _id: string;
  email: string;
  role: string;
  fullName: string;
  publicEmail: string;
  phoneNumber: string;
  location: string;
  profilePicture: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
  updatedAt: Date;
  createdAt: Date;
}

type ProfileFormData = Omit<
  UserProfile,
  "_id" | "email" | "role" | "updatedAt" | "createdAt"
>;

export default function AdminProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    publicEmail: "",
    phoneNumber: "",
    location: "",
    profilePicture: "/me.jpg",
    bio: "",
    githubUrl: "",
    linkedinUrl: "",
    xUrl: "",
  });

  // Load user profile
  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to load users");

      const users = await response.json();
      console.log("Fetched users:", users);
      console.log("Current session email:", session?.user?.email);
      
      // Find current user by email
      const currentUser = users.find(
        (user: any) => user.email === session?.user?.email
      );

      console.log("Found current user:", currentUser);

      if (currentUser) {
        setProfile(currentUser);
        setFormData({
          fullName: currentUser.fullName || "",
          publicEmail: currentUser.publicEmail || "",
          phoneNumber: currentUser.phoneNumber || "",
          location: currentUser.location || "",
          profilePicture: currentUser.profilePicture || "/me.jpg",
          bio: currentUser.bio || "",
          githubUrl: currentUser.githubUrl || "",
          linkedinUrl: currentUser.linkedinUrl || "",
          xUrl: currentUser.xUrl || "",
        });
      } else {
        console.log("No user found matching session email");
        toast({
          title: "Warning",
          description: "User profile not found. Please ensure you have run the database initialization.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Profile loading error:", error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      loadProfile();
    }
  }, [session]);

  // Handle form field changes
  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Save profile
  const handleSaveProfile = async () => {
    if (!profile) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/users/${profile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedProfile = await response.json();
      setProfile(updatedProfile);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading profile...</div>
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
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">
              Manage your personal information and public profile
            </p>
          </div>
          <Button onClick={handleSaveProfile} disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                This image will be displayed on your public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden bg-muted">
                  {formData.profilePicture ? (
                    <Image
                      src={formData.profilePicture}
                      alt="Profile Picture"
                      className="object-cover"
                      priority
                      width={128}
                      height={128}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <UserIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="profilePicture">Profile Picture URL</Label>
                <Input
                  id="profilePicture"
                  value={formData.profilePicture}
                  onChange={(e) =>
                    handleInputChange("profilePicture", e.target.value)
                  }
                  placeholder="/me.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your basic information that will be displayed publicly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publicEmail">Public Email</Label>
                    <Input
                      id="publicEmail"
                      type="email"
                      value={formData.publicEmail}
                      onChange={(e) =>
                        handleInputChange("publicEmail", e.target.value)
                      }
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell people about yourself..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Your social media profiles and portfolios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      handleInputChange("githubUrl", e.target.value)
                    }
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="xUrl">X URL</Label>
                  <Input
                    id="xUrl"
                    value={formData.xUrl}
                    onChange={(e) => handleInputChange("xUrl", e.target.value)}
                    placeholder="https://x.com/username"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Read-only account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email (Login)</Label>
                    <Input value={profile?.email || ""} disabled />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input value={profile?.role || ""} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
