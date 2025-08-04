import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/lib/i18n";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertOrganizerSchema, insertUserSchema } from "@shared/schema";
import {
  Shield,
  Star,
  CheckCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Calendar,
  Award,
  Users,
} from "lucide-react";

// Combined schema for user + organizer registration
const organizerSignupSchema = insertUserSchema.extend({
  companyName: z.string().min(1, "Company name is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  yearsExperience: z
    .number()
    .min(1, "Years of experience must be at least 1")
    .max(50, "Years of experience seems to high"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
});

type OrganizerSignupFormData = z.infer<typeof organizerSignupSchema>;

export default function OrganizerSignup() {
  const { toast } = useToast();
  const { t, isRTL } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<OrganizerSignupFormData>({
    resolver: zodResolver(organizerSignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "organizer",
      companyName: "",
      description: "",
      yearsExperience: 1,
      contactEmail: "",
      contactPhone: "",
      website: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: OrganizerSignupFormData) => {
      // Register organizer via the auth endpoint which includes email verification
      return apiRequest("POST", "/api/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        role: "organizer",
        // Include organizer-specific data
        organizerData: {
          companyName: data.companyName,
          description: data.description,
          yearsExperience: data.yearsExperience,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          website: data.website || undefined,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Registration successful!",
        description:
          "Please check your email to verify your account. After verification, your organizer profile will be reviewed within 48 hours.",
      });
      setIsSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: OrganizerSignupFormData) => {
    signupMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-verified text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Pilgrimage Connect!
              </h1>
              <p className="text-gray-600 mb-6">
                Your organizer profile has been submitted successfully. Please
                check your email to verify your account. After email
                verification, our team will review your credentials and verify
                your account within 48 hours. You'll receive an email
                confirmation once your account is approved.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  What happens next?
                </h3>
                <ul className="text-sm text-blue-800 text-left space-y-1">
                  <li>• We'll verify your credentials and experience</li>
                  <li>• Check your references and certifications</li>
                  <li>• Review your company registration and licenses</li>
                  <li>• Approve your profile and send you login credentials</li>
                </ul>
              </div>
              <Button className="bg-primary text-white hover:bg-primary/90">
                Return to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("organizerSignup.hero.title")}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t("organizerSignup.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Benefits Section 
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get Verified</h3>
              <p className="text-gray-600">Build trust with our comprehensive verification process</p>
            </div>
            
            <div className="text-center">
              <div className="bg-verified text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reach More Pilgrims</h3>
              <p className="text-gray-600">Access our global network of faith-based travelers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Build Your Reputation</h3>
              <p className="text-gray-600">Showcase reviews and grow your credibility</p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Registration Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {t("organizerSignup.form.title")}
              </CardTitle>
              <p className="text-center text-gray-600">
                {t("organizerSignup.form.subtitle")}
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Account Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your-company-username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="admin@yourcompany.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a secure password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      Company Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Sacred Journeys Tours Ltd."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your company, services, and experience in organizing pilgrimage trips..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="yearsExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="50"
                                placeholder="15"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 1)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://www.yourcompany.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="bookings@yourcompany.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Verification Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2 flex items-center text-blue-900">
                      <Award className="w-5 h-5 mr-2" />
                      Verification Process
                    </h3>
                    <p className="text-sm text-blue-800 mb-3">
                      After registration, our team will verify your credentials.
                      Please have the following ready:
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Business registration documents</li>
                      <li>• Travel operator license</li>
                      <li>• Insurance certificates</li>
                      <li>• References from previous clients</li>
                      <li>
                        • Religious authority endorsements (if applicable)
                      </li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    size="lg"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending
                      ? "Creating Account..."
                      : "Register as Organizer"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By registering, you agree to our Terms of Service and
                    Privacy Policy. Your account will be reviewed within 48
                    hours.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
