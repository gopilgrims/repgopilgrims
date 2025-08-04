# GoPilgrims.com Platform

## Overview

GoPilgrims.com is a full-stack web application serving as a marketplace connecting zaireens (pilgrims) with verified tour operators for spiritual journeys including Hajj, Umrah, Iraq ziyarat (Karbala, Najaf), Iran ziyarat (Qom, Mashhad), and other religious pilgrimages. The platform enables users to browse, compare, and book spiritual travel packages while providing tour operators with tools to list and manage their offerings. Key capabilities include multi-lingual support, professional email delivery via SendGrid, and a WhatsApp message parser to digitize tour announcements.

## Recent Changes (August 2025)
- Successfully rebranded from MakeMeZaer.com to GoPilgrims.com across entire platform
- Integrated SendGrid email service for professional email delivery
- Updated all multi-language translations with new brand name
- Configured email system with SendGrid primary and SMTP fallback
- Verified email delivery functionality working correctly
- Fixed email verification system permanently - all verification links now work correctly
- Resolved DatabaseStorage class missing methods issue
- **SECURITY ENHANCEMENT**: Fixed password reset link issue - URL parameter parsing now works correctly
- **MAJOR SECURITY UPDATE**: Added email verification to organizer registration for consistency and security
- **UNIFIED AUTH FLOW**: Both pilgrims and organizers now use same `/api/auth/register` endpoint with email verification

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with a custom design system
- **Forms**: React Hook Form with Zod validation
- **UI/UX Decisions**: Responsive design with Tailwind breakpoints, accessible components, cultural sensitivity, custom color schemes, and icon integration (Lucide).
- **Key Features**: Enhanced trip search with organizer filter and smart default display (active trips), user-friendly error messages, comprehensive profile management with nationality field, redesigned review system with "Good Experience" and "Bad Experience" fields, enhanced company profile editing with business contact fields and company logo upload, complete daily itinerary system across all trip forms and displays, Trip Zakirs (Spiritual Priests) display, and a static destination image fallback system.

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Email Service**: SendGrid API with SMTP fallback (nodemailer)
- **Build Process**: ESBuild for production bundling
- **Development**: tsx for TypeScript execution
- **System Design Choices**: RESTful API for CRUD operations, search and filtering capabilities, file upload support, error handling middleware, role-based access control (pilgrim, organizer, admin), secure authentication with JWT, professional email delivery with SendGrid integration, and Drizzle migrations for schema changes.

### Project Structure
- `client/`: Frontend React application
- `server/`: Backend Express API
- `shared/`: Shared TypeScript types and schemas
- `migrations/`: Database migration files
- `dist/`: Production build output

### Database Schema (Core Tables)
- **Users**: Authentication and user profiles with role-based access.
- **Organizers**: Company profiles with verification status and business information.
- **Trips**: Pilgrimage packages with detailed itineraries and accommodations.
- **Reviews**: User feedback and ratings.
- **Bookings**: Trip reservations and pilgrim management.

### Key Features
- **Comprehensive Trip Management**: Create, Read, Update, Delete (CRUD) operations for trips, including daily itinerary builder and Zakirs assignment.
- **User & Organizer Profiles**: Detailed profile management, including company logos and business contact information.
- **Enhanced Review System**: Structured feedback collection for good and bad experiences.
- **Advanced Search & Filtering**: Multi-criteria search (destination, dates, organizer), real-time filtering, and sorting.
- **Booking Workflow**: Form-based booking with validation and confirmation.
- **WhatsApp Parser**: Converts WhatsApp announcements into structured listings for organizers.
- **Multi-lingual Support**: English, Arabic, Urdu, Hindi, with RTL language support.
- **Image Handling**: Custom image upload, display, and a robust static destination image fallback system.
- **Professional Email System**: SendGrid integration for reliable email delivery with automatic SMTP fallback (tested and verified working).
- **Comprehensive Email Verification**: All users (pilgrims and organizers) must verify email addresses before platform access.
- **Two-Tier Organizer Verification**: Email verification (immediate) + admin verification (48 hours) for enhanced security.

## External Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler
- **drizzle-kit**: Database migration tools
- **@sendgrid/mail**: Professional email delivery service