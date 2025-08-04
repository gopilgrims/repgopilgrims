import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const registerSchema = z
    .object({
      firstName: z.string().min(2, t("auth.firstNameMinLength")),
      lastName: z.string().min(2, t("auth.lastNameMinLength")),
      email: z.string().email(t("auth.validEmailRequired")),
      password: z
        .string()
        .min(8, t("auth.passwordMinLengthRegister"))
        .regex(/[A-Z]/, t("auth.passwordUppercase"))
        .regex(/[a-z]/, t("auth.passwordLowercase"))
        .regex(/[0-9]/, t("auth.passwordNumber")),
      confirmPassword: z.string(),
      agreeToTerms: z
        .boolean()
        .refine(
          (val) => val === true,
          t("auth.mustAgreeToTerms")
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.passwordsDontMatch"),
      path: ["confirmPassword"],
    });

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      await apiRequest("POST", "/api/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      setSuccess(true);
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  const handleAppleLogin = () => {
    window.location.href = "/api/auth/apple";
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t("auth.checkYourEmail")}
            </CardTitle>
            <CardDescription>{t("auth.verificationLinkSent")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600">
              <p>{t("auth.checkEmailAndClick")}</p>
              <p className="mt-2">{t("auth.didntReceiveEmail")}</p>
            </div>
            <Button onClick={() => setLocation("/login")} className="w-full">
              {t("auth.goToSignIn")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t("auth.createAccount")}
          </CardTitle>
          <CardDescription>{t("auth.joinGoPilgrims")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Registration Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                <Input
                  id="firstName"
                  placeholder={t("auth.firstNamePlaceholder")}
                  {...form.register("firstName")}
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input
                  id="lastName"
                  placeholder={t("auth.lastNamePlaceholder")}
                  {...form.register("lastName")}
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.enterYourEmail")}
                  className="pl-10"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("auth.createPasswordPlaceholder")}
                  className="pr-10"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("auth.confirmPassword")}
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("auth.confirmPasswordPlaceholder")}
                  className="pr-10"
                  {...form.register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={form.watch("agreeToTerms")}
                onCheckedChange={(checked) =>
                  form.setValue("agreeToTerms", checked as boolean)
                }
              />
              <Label htmlFor="agreeToTerms" className="text-sm">
                {t("auth.agreeToTermsStart")}{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  {t("auth.termsOfService")}
                </Link>{" "}
                {t("auth.and")}{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  {t("auth.privacyPolicy")}
                </Link>
              </Label>
            </div>
            {form.formState.errors.agreeToTerms && (
              <p className="text-sm text-red-600">
                {form.formState.errors.agreeToTerms.message}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("auth.createAccount")}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">
              {t("auth.alreadyHaveAccount")}{" "}
            </span>
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              {t("auth.signIn")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
