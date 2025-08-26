"use client";

import React, { useState, useEffect } from "react";
import { Save, RefreshCw, Mail, Phone, MapPin, Clock } from "lucide-react";

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

interface ContactInfo {
  id: string;
  email: string;
  phone?: string;
  location?: string;
  businessHours?: string;
  updatedAt: Date;
}

type ContactInfoFormData = Omit<ContactInfo, "id" | "updatedAt">;

export default function ContactInfoPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactInfoFormData>({
    email: "",
    phone: "",
    location: "",
    businessHours: "",
  });

  // Load contact info
  const loadContactInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/contact");
      if (!response.ok) throw new Error("Failed to load contact info");
      const data = await response.json();

      if (data.length > 0) {
        const contactData = data[0];
        setContactInfo(contactData);
        setFormData({
          email: contactData.email || "",
          phone: contactData.phone || "",
          location: contactData.location || "",
          businessHours: contactData.businessHours || "",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contact information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContactInfo();
  }, []);

  // Handle form field changes
  const handleInputChange = (
    field: keyof ContactInfoFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Save contact info
  const handleSaveContactInfo = async () => {
    if (!formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url = contactInfo
        ? `/api/contact/${contactInfo.id}`
        : "/api/contact";
      const method = contactInfo ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save contact info");

      toast({
        title: "Success",
        description: "Contact information saved successfully",
      });

      loadContactInfo(); // Reload to get updated data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save contact information",
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
            Loading contact information...
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
              Contact Information
            </h2>
            <p className="text-muted-foreground">
              Manage your contact details and business information
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={loadContactInfo}
              disabled={isSubmitting}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={handleSaveContactInfo} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>
                Your primary contact information for visitors and clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="contact@yourwebsite.com"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="City, Country"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Additional business details and availability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="business-hours">Business Hours</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="business-hours"
                    value={formData.businessHours}
                    onChange={(e) =>
                      handleInputChange("businessHours", e.target.value)
                    }
                    placeholder="Monday - Friday, 9 AM - 6 PM EST"
                    rows={3}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Let visitors know when you're available for work or
                  communication
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Preview how your contact information will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  {formData.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${formData.email}`}
                        className="text-primary hover:underline"
                      >
                        {formData.email}
                      </a>
                    </div>
                  )}
                  {formData.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${formData.phone}`}
                        className="text-primary hover:underline"
                      >
                        {formData.phone}
                      </a>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {formData.location}
                      </span>
                    </div>
                  )}
                  {formData.businessHours && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-muted-foreground">
                        <div className="font-medium text-foreground mb-1">
                          Business Hours
                        </div>
                        <div className="whitespace-pre-line text-sm">
                          {formData.businessHours}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!formData.email &&
                  !formData.phone &&
                  !formData.location &&
                  !formData.businessHours && (
                    <p className="text-muted-foreground text-center py-4">
                      No contact information available
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
