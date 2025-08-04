import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function AuthTest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Authentication System Test
          </h1>
          <p className="text-xl text-gray-600">
            Test the new Sign In and Registration features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🔐</span>
                <span>Sign In</span>
              </CardTitle>
              <CardDescription>
                Existing users can sign in with their email and password, or use Google/Apple Sign In
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/login">
                <Button className="w-full" size="lg">
                  Go to Sign In Page
                </Button>
              </Link>
              <div className="text-sm text-gray-600">
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <strong>Demo Credentials:</strong><br />
                  Email: demo@example.com<br />
                  Password: password123
                </div>
                Features:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Email/password authentication</li>
                  <li>Google Sign In integration</li>
                  <li>Apple Sign In integration</li>
                  <li>Password reset functionality</li>
                  <li>JWT token-based sessions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📝</span>
                <span>Register</span>
              </CardTitle>
              <CardDescription>
                New users can create an account with email verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/register">
                <Button className="w-full" size="lg" variant="outline">
                  Go to Registration Page
                </Button>
              </Link>
              <div className="text-sm text-gray-600">
                Features:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Email verification system</li>
                  <li>Secure password hashing</li>
                  <li>Form validation</li>
                  <li>Professional email templates</li>
                  <li>JWT token-based authentication</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Authentication API Endpoints</CardTitle>
              <CardDescription>
                Backend API routes for authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Email Authentication:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li><code className="bg-gray-100 px-1 rounded">POST /api/auth/register</code> - Register new user</li>
                    <li><code className="bg-gray-100 px-1 rounded">POST /api/auth/login</code> - Sign in user</li>
                    <li><code className="bg-gray-100 px-1 rounded">GET /api/auth/verify-email</code> - Verify email</li>
                    <li><code className="bg-gray-100 px-1 rounded">GET /api/user</code> - Get user profile</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">OAuth Authentication:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li><code className="bg-gray-100 px-1 rounded">GET /api/auth/google</code> - Google Sign In</li>
                    <li><code className="bg-gray-100 px-1 rounded">GET /api/auth/apple</code> - Apple Sign In</li>
                    <li><code className="bg-gray-100 px-1 rounded">GET /api/auth/google/callback</code> - Google callback</li>
                    <li><code className="bg-gray-100 px-1 rounded">POST /api/auth/apple/callback</code> - Apple callback</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}