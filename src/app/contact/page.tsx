"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, X } from "lucide-react";

import { MainLayout } from "@/components/common/main-layout";
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
import { validateEmailFormat, validateRequiredFields } from "@/lib/validate_email_formatting";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ContactPage() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user profile
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const usersResponse = await fetch("/api/users");

        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          if (usersData.length > 0) {
            setUserProfile(usersData[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // validation
    const fieldValidation = validateRequiredFields({
      firstName,
      lastName,
      email,
      subject,
      message
    });

    if (!fieldValidation.isValid) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${fieldValidation.missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    if (!validateEmailFormat(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent Successfully! ✅",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });

        // Reset the form
        form.reset();
      } else {
        toast({
          title: "Failed to Send Message",
          description: responseData.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to send message. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get in Touch
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Have a question or want to work together? Drop me a message, and
              I'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below to send me a message.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input
                          id="first-name"
                          name="firstName"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input
                          id="last-name"
                          name="lastName"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Enter the subject"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="text-muted-foreground">
                  Feel free to reach out through any of the following channels:
                </p>

                <ul className="space-y-4">
                  {userProfile?.publicEmail && (
                    <li className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href={`mailto:${userProfile.publicEmail}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {userProfile.publicEmail}
                        </a>
                      </div>
                    </li>
                  )}
                  {userProfile?.phoneNumber && (
                    <li className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a
                          href={`tel:${userProfile.phoneNumber}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {userProfile.phoneNumber}
                        </a>
                      </div>
                    </li>
                  )}
                  {userProfile?.location && (
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">
                          {userProfile.location}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold">Connect Online</h2>
                <p className="text-muted-foreground">
                  Connect with me on the following platforms
                </p>

                <div className="flex gap-4">
                  {userProfile?.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href={userProfile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  )}
                  {userProfile?.linkedinUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href={userProfile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  )}
                  {userProfile?.xUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a
                        href={userProfile.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">X</span>
                      </a>
                    </Button>
                  )}
                  {userProfile?.publicEmail && (
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <a href={`mailto:${userProfile.publicEmail}`}>
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
