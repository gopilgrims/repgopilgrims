import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';
import type { User } from '@shared/schema';

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// Email Configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// SendGrid Configuration
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@gopilgrims.com';

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Create email transporter (fallback to nodemailer)
let transporter: any = null;
if (EMAIL_CONFIG.auth.user) {
  transporter = nodemailer.createTransporter(EMAIL_CONFIG);
}

// Import JWT functions
import { generateToken as genToken, verifyToken as verToken } from './jwt-utils';

export function generateToken(userId: string): string {
  return genToken(userId);
}

export function verifyToken(token: string): any {
  return verToken(token);
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Enhanced email sending function with SendGrid priority
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const emailData = {
    from: FROM_EMAIL,
    to,
    subject,
    html,
  };

  // Try SendGrid first if API key is available
  if (SENDGRID_API_KEY) {
    try {
      const result = await sgMail.send(emailData);
      console.log(`Email sent successfully via SendGrid to ${to}`);
      console.log('SendGrid response:', result[0].statusCode, result[0].headers);
      return;
    } catch (error) {
      console.error('SendGrid failed, falling back to SMTP:', error);
      // Log more details about the SendGrid error
      if (error && typeof error === 'object' && 'response' in error) {
        console.error('SendGrid error details:', (error as any).response?.body);
      }
    }
  }

  // Fallback to nodemailer/SMTP
  if (transporter) {
    try {
      await transporter.sendMail({
        ...emailData,
        from: `"GoPilgrims.com" <${EMAIL_CONFIG.auth.user}>`,
      });
      console.log(`Email sent successfully via SMTP to ${to}`);
    } catch (error) {
      console.error('SMTP also failed:', error);
      throw new Error('Failed to send email via both SendGrid and SMTP');
    }
  } else {
    console.warn('No email configuration available, skipping email send');
  }
}

// Send verification email
export async function sendVerificationEmail(email: string, token: string, baseUrl: string): Promise<void> {
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome to GoPilgrims.com!</h2>
      <p>Thank you for registering with GoPilgrims.com, your trusted platform for Islamic pilgrimage journeys.</p>
      <p>Please click the button below to verify your email address:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">
        If you didn't create an account with GoPilgrims.com, you can safely ignore this email.
      </p>
    </div>
  `;

  await sendEmail(email, 'Verify your email - GoPilgrims.com', html);
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, token: string, baseUrl: string): Promise<void> {
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Password Reset Request</h2>
      <p>You requested to reset your password for your GoPilgrims.com account.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #dc2626; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 6px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; color: #666;">${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="color: #666; font-size: 12px;">
        If you didn't request a password reset, you can safely ignore this email.
      </p>
    </div>
  `;

  await sendEmail(email, 'Reset your password - GoPilgrims.com', html);
}

// Authentication middleware
export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const user = await storage.getUser(decoded.userId);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    (req as any).user = { ...user, userId: user.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
}

// Optional authentication middleware (doesn't fail if no token)
export async function optionalAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      const user = await storage.getUser(decoded.userId);
      if (user) {
        (req as any).user = user;
      }
    }
  }

  next();
}