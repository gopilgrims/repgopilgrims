# GoPilgrims.com

A comprehensive pilgrimage trip marketplace connecting verified tour operators with pilgrims seeking trusted travel packages for spiritual journeys.

## Overview

GoPilgrims.com serves as a centralized platform for Islamic pilgrimage destinations including:
- Hajj and Umrah packages
- Iraq ziyarat (Karbala, Najaf)
- Iran ziyarat (Qom, Mashhad)
- Syria and other religious pilgrimage sites

## Features

- **Multi-lingual Support**: English, Arabic, Urdu, Hindi, Farsi with RTL support
- **Verified Organizers**: Comprehensive vetting and verification process
- **Transparent Reviews**: Authentic feedback from fellow pilgrims
- **WhatsApp Parser**: Convert tour announcements into structured listings
- **Secure Bookings**: Protected payment processing
- **Mobile Responsive**: Optimized for all devices

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite build tool
- Wouter routing
- TanStack Query for state management
- Shadcn/ui components with Radix UI
- Tailwind CSS styling

### Backend
- Node.js with Express.js
- PostgreSQL with Drizzle ORM
- Neon Database (serverless)
- SendGrid email service
- JWT authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- SendGrid API key (for email)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jareetech/gopilgrims.git
cd gopilgrims
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy example env file
cp .env.example .env

# Add your database URL and other secrets
DATABASE_URL=your_postgres_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sender_email
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared TypeScript types and schemas
├── dist/           # Production build output
└── migrations/     # Database migration files
```

## Key Features

### For Pilgrims
- Browse and compare pilgrimage packages
- Read authentic reviews from other pilgrims
- Secure booking system
- Multi-language interface
- Mobile-responsive design

### For Tour Organizers
- List and manage trip packages
- WhatsApp message parser for quick listing creation
- Customer management dashboard
- Verification and credibility system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Contact

For support or inquiries, please contact [your-email@domain.com]

---

Built with ❤️ for the global Muslim community seeking authentic pilgrimage experiences.