"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Code2 } from "lucide-react";

import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Skills {
  _id: string;
  languages: string[];
  frameworksAndStack: string[];
  toolsAndServices: string[];
  updatedAt: Date;
  createdAt: Date;
}

type SkillCategory = "languages" | "frameworksAndStack" | "toolsAndServices";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skills | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogCategory, setDialogCategory] =
    useState<SkillCategory>("languages");
  const [newSkill, setNewSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Load skills
  const loadSkills = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/skills");
      if (!response.ok) throw new Error("Failed to load skills");
      const data = await response.json();
      setSkills(data.length > 0 ? data[0] : null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // Add skill to category
  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast({
        title: "Validation Error",
        description: "Skill name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: dialogCategory,
          skill: newSkill.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to add skill");

      const updatedSkills = await response.json();
      setSkills(updatedSkills);

      toast({
        title: "Success",
        description: `Added "${newSkill}" to ${getCategoryDisplayName(
          dialogCategory
        )}`,
      });

      setIsDialogOpen(false);
      setNewSkill("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove skill from category
  const handleRemoveSkill = async (category: SkillCategory, skill: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          skill,
        }),
      });

      if (!response.ok) throw new Error("Failed to remove skill");

      const updatedSkills = await response.json();
      setSkills(updatedSkills);

      toast({
        title: "Success",
        description: `Removed "${skill}" from ${getCategoryDisplayName(
          category
        )}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open dialog for adding skill
  const openAddDialog = (category: SkillCategory) => {
    setDialogCategory(category);
    setNewSkill("");
    setIsDialogOpen(true);
  };

  // Get category display name
  const getCategoryDisplayName = (category: SkillCategory) => {
    switch (category) {
      case "languages":
        return "Programming Languages";
      case "frameworksAndStack":
        return "Frameworks & Stack";
      case "toolsAndServices":
        return "Tools & Services";
      default:
        return category;
    }
  };

  // Get category color
  const getCategoryColor = (category: SkillCategory) => {
    switch (category) {
      case "languages":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "frameworksAndStack":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "toolsAndServices":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
            <p className="text-muted-foreground">
              Manage your technical skills and expertise
            </p>
          </div>
        </div>

        {/* Skills Display */}
        <div className="grid gap-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">Loading skills...</div>
            </div>
          ) : !skills ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Code2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  No skills added yet.
                </p>
                <Button onClick={() => openAddDialog("languages")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add your first skill
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technical Skills</CardTitle>
                <CardDescription>
                  Last updated:{" "}
                  {new Date(skills.updatedAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Programming Languages */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">
                      Programming Languages
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddDialog("languages")}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className={`${getCategoryColor(
                          "languages"
                        )} group cursor-pointer`}
                        onClick={() => handleRemoveSkill("languages", language)}
                      >
                        {language}
                        <X className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100" />
                      </Badge>
                    ))}
                    {skills.languages.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No languages added yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Frameworks & Stack */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-green-700 dark:text-green-300">
                      Frameworks & Stack
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddDialog("frameworksAndStack")}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworksAndStack.map((framework) => (
                      <Badge
                        key={framework}
                        variant="secondary"
                        className={`${getCategoryColor(
                          "frameworksAndStack"
                        )} group cursor-pointer`}
                        onClick={() =>
                          handleRemoveSkill("frameworksAndStack", framework)
                        }
                      >
                        {framework}
                        <X className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100" />
                      </Badge>
                    ))}
                    {skills.frameworksAndStack.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No frameworks added yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Tools & Services */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-purple-700 dark:text-purple-300">
                      Tools & Services
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddDialog("toolsAndServices")}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.toolsAndServices.map((tool) => (
                      <Badge
                        key={tool}
                        variant="secondary"
                        className={`${getCategoryColor(
                          "toolsAndServices"
                        )} group cursor-pointer`}
                        onClick={() =>
                          handleRemoveSkill("toolsAndServices", tool)
                        }
                      >
                        {tool}
                        <X className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100" />
                      </Badge>
                    ))}
                    {skills.toolsAndServices.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No tools added yet
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add Skill Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to {getCategoryDisplayName(dialogCategory)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="skill">Skill Name *</Label>
                <Input
                  id="skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder={`Enter ${getCategoryDisplayName(
                    dialogCategory
                  ).toLowerCase()} skill...`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddSkill();
                    }
                  }}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSkill} disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Skill"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
