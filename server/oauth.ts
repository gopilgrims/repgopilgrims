import { Request, Response } from 'express';
import { storage } from './storage';
import { generateToken } from './auth';
import type { User } from '@shared/schema';

// OAuth provider configurations
const GOOGLE_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI || '/api/auth/google/callback',
};

const APPLE_CONFIG = {
  clientId: process.env.APPLE_CLIENT_ID,
  teamId: process.env.APPLE_TEAM_ID,
  keyId: process.env.APPLE_KEY_ID,
  privateKey: process.env.APPLE_PRIVATE_KEY,
  redirectUri: process.env.APPLE_REDIRECT_URI || '/api/auth/apple/callback',
};

// Google OAuth URLs
const GOOGLE_OAUTH_URL = 'https://accounts.google.com/oauth/authorize';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

// Apple OAuth URLs
const APPLE_OAUTH_URL = 'https://appleid.apple.com/auth/authorize';
const APPLE_TOKEN_URL = 'https://appleid.apple.com/auth/token';

// Generate Google OAuth URL
export function getGoogleAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_CONFIG.clientId!,
    redirect_uri: GOOGLE_CONFIG.redirectUri,
    scope: 'openid email profile',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `${GOOGLE_OAUTH_URL}?${params.toString()}`;
}

// Generate Apple OAuth URL
export function getAppleAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: APPLE_CONFIG.clientId!,
    redirect_uri: APPLE_CONFIG.redirectUri,
    scope: 'name email',
    response_type: 'code',
    response_mode: 'form_post',
  });

  return `${APPLE_OAUTH_URL}?${params.toString()}`;
}

// Handle Google OAuth callback
export async function handleGoogleCallback(req: Request, res: Response): Promise<void> {
  try {
    const { code } = req.query;

    if (!code) {
      res.status(400).json({ message: 'Authorization code required' });
      return;
    }

    // Exchange code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId!,
        client_secret: GOOGLE_CONFIG.clientSecret!,
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_CONFIG.redirectUri,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      res.status(400).json({ message: 'Failed to get access token' });
      return;
    }

    // Get user info from Google
    const userResponse = await fetch(GOOGLE_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const googleUser = await userResponse.json();

    // Check if user exists or create new user
    let user = await storage.getUserByEmail(googleUser.email);

    if (!user) {
      // Create new user
      user = await storage.createUser({
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        profileImageUrl: googleUser.picture,
        emailVerified: true, // Google emails are pre-verified
        authProvider: 'google',
        authProviderUserId: googleUser.id,
      });
    } else if (user.authProvider !== 'google') {
      // Link Google account to existing user
      await storage.updateUser(user.id, {
        authProvider: 'google',
        authProviderUserId: googleUser.id,
        emailVerified: true,
        profileImageUrl: user.profileImageUrl || googleUser.picture,
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Update last login
    await storage.updateUser(user.id, { lastLoginAt: new Date() });

    // Return token and user info
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}

// Handle Apple OAuth callback
export async function handleAppleCallback(req: Request, res: Response): Promise<void> {
  try {
    const { code, user: userInfo } = req.body;

    if (!code) {
      res.status(400).json({ message: 'Authorization code required' });
      return;
    }

    // Note: Apple Sign In requires more complex JWT creation for client_secret
    // This is a simplified version - in production, you'd need to generate a JWT
    // using your Apple private key for the client_secret
    
    console.log('Apple callback received:', { code, userInfo });
    
    // For now, return a placeholder response
    res.status(501).json({ 
      message: 'Apple Sign In integration requires additional setup with Apple Developer account' 
    });
  } catch (error) {
    console.error('Apple OAuth error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
}

// Check if OAuth providers are configured
export function getAvailableProviders(): string[] {
  const providers: string[] = ['email'];
  
  if (GOOGLE_CONFIG.clientId && GOOGLE_CONFIG.clientSecret) {
    providers.push('google');
  }
  
  if (APPLE_CONFIG.clientId && APPLE_CONFIG.privateKey) {
    providers.push('apple');
  }
  
  return providers;
}