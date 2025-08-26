"use client";

import React, { useState, useEffect } from "react";
import { Save, RefreshCw, Plus, X } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfo {
  id: string;
  name: string;
  bio: string;
  profilePicture?: string;
  skills: string[];
  experience: string;
  updatedAt: Date;
}

type PersonalInfoFormData = Omit<PersonalInfo, "id" | "updatedAt">;

export default function PersonalInfoPage() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: "",
    bio: "",
    profilePicture: "",
    skills: [],
    experience: "",
  });

  // Load personal info
  const loadPersonalInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/personal");
      if (!response.ok) throw new Error("Failed to load personal info");
      const data = await response.json();

      if (data.length > 0) {
        const personalData = data[0];
        setPersonalInfo(personalData);
        setFormData({
          name: personalData.name || "",
          bio: personalData.bio || "",
          profilePicture: personalData.profilePicture || "",
          skills: personalData.skills || [],
          experience: personalData.experience || "",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load personal information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  // Handle form field changes
  const handleInputChange = (field: keyof PersonalInfoFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Handle Enter key for adding skills
  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Save personal info
  const handleSavePersonalInfo = async () => {
    if (!formData.name.trim() || !formData.bio.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and bio are required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url = personalInfo
        ? `/api/personal/${personalInfo.id}`
        : "/api/personal";
      const method = personalInfo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save personal info");

      toast({
        title: "Success",
        description: "Personal information saved successfully",
      });

      loadPersonalInfo(); // Reload to get updated data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save personal information",
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
          <div className="text-muted-foreground">
            Loading personal information...
          </div>
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
            <h2 className="text-3xl font-bold tracking-tight">
              Personal Information
            </h2>
            <p className="text-muted-foreground">
              Manage your personal profile and professional information
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={loadPersonalInfo}
              disabled={isSubmitting}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={handleSavePersonalInfo} disabled={isSubmitting}>
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
                Your name, bio, and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="profile-picture">Profile Picture URL</Label>
                  <Input
                    id="profile-picture"
                    value={formData.profilePicture}
                    onChange={(e) =>
                      handleInputChange("profilePicture", e.target.value)
                    }
                    placeholder="/images/profile.jpg"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell visitors about yourself, your background, and what you do"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Technologies</CardTitle>
              <CardDescription>
                Add your technical skills and technologies you work with
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  placeholder="Add a skill (e.g., React, TypeScript, Node.js)"
                  className="flex-1"
                />
                <Button onClick={handleAddSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="pr-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              {formData.skills.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No skills added yet. Add your first skill above.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Experience</CardTitle>
              <CardDescription>
                Describe your professional background and experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="experience">Experience Summary</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="Describe your professional experience, years of work, specializations, etc."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview how your information will appear on your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-4">
                  {formData.profilePicture && (
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={formData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling!.classList.remove("hidden");
                        }}
                      />
                      <div className="hidden w-full h-full bg-muted items-center justify-center text-xs text-muted-foreground">
                        No Image
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {formData.name || "Your Name"}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {formData.bio || "Your bio will appear here"}
                    </p>
                  </div>
                </div>

                {formData.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {formData.experience && (
                  <div>
                    <h4 className="font-medium mb-2">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.experience}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
