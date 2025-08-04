import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function EmailVerification() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          setStatus('error');
          setMessage('Verification token is missing');
          return;
        }

        await apiRequest("GET", `/api/auth/verify-email?token=${token}`);
        setStatus('success');
        setMessage('Your email has been successfully verified! You can now sign in.');
      } catch (error: any) {
        if (error.message.includes('expired')) {
          setStatus('expired');
          setMessage('Your verification link has expired. Please register again.');
        } else {
          setStatus('error');
          setMessage(error.message || 'Email verification failed');
        }
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {status === 'loading' && <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />}
              {status === 'success' && <CheckCircle className="w-12 h-12 text-green-500" />}
              {(status === 'error' || status === 'expired') && <XCircle className="w-12 h-12 text-red-500" />}
            </div>
            <CardTitle>
              {status === 'loading' && 'Verifying Your Email...'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
              {status === 'expired' && 'Link Expired'}
            </CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {status === 'success' && (
              <div className="space-y-4">
                <Alert>
                  <Mail className="w-4 h-4" />
                  <AlertDescription>
                    Your account is now active. You can sign in with your email and password.
                  </AlertDescription>
                </Alert>
                <Link href="/login">
                  <Button className="w-full" size="lg">
                    Continue to Sign In
                  </Button>
                </Link>
              </div>
            )}
            
            {status === 'expired' && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    Don't worry! You can register again with the same email address.
                  </AlertDescription>
                </Alert>
                <Link href="/register">
                  <Button className="w-full" size="lg">
                    Register Again
                  </Button>
                </Link>
              </div>
            )}
            
            {status === 'error' && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    If you continue to have issues, please contact support.
                  </AlertDescription>
                </Alert>
                <Link href="/register">
                  <Button className="w-full" size="lg" variant="outline">
                    Try Registration Again
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-primary">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}