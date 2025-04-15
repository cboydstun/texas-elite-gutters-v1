# Texas Elite Gutters & Exteriors

A modern, responsive website for Texas Elite Gutters & Exteriors, a gutters repair and installation business serving San Antonio and Converse, TX.

## Project Overview

This project is a business website built with Next.js 15, TypeScript, and modern web development practices. It aims to showcase the company's services, provide information to potential customers, and generate leads through contact forms.

## Business Information

- **Business Name**: Texas Elite Gutters & Exteriors
- **Service Areas**: San Antonio, TX and Converse, TX
- **Contact Number**: 210-835-7520

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API / Zustand
- **Authentication**:
  - NextAuth.js for authentication and session management
  - JWT (JSON Web Tokens) for secure authentication
  - MongoDB for user data storage
- **Database**:
  - MongoDB with Mongoose ODM
  - Data validation and schema enforcement
- **Analytics**:
  - ThumbMarkJS for browser fingerprinting
  - Visitor tracking and analytics
  - Custom analytics dashboard
- **Form Handling**:
  - React Hook Form for form state management
  - Zod for schema validation
  - Custom form components with validation feedback
  - Nodemailer for email notifications from contact form submissions
- **Testing**:
  - Jest as the test runner
  - React Testing Library for component testing
  - User Event for interaction simulation
  - TDD (Test-Driven Development) approach
  - MongoDB Memory Server for database testing
- **Deployment**: Vercel

## Project Structure

```
texas-elite-gutters-v1/
├── __tests__/                # Test files following TDD approach
│   ├── api/                  # API endpoint tests
│   │   └── v1/               # API version 1 tests
│   ├── components/           # Component tests
│   │   ├── layout/           # Layout component tests
│   │   └── ui/               # UI component tests
│   ├── lib/                  # Library tests
│   │   ├── auth/             # Authentication tests
│   │   └── db/               # Database tests
│   │       └── models/       # Database model tests
│   └── pages/                # Page tests
├── src/                      # Source code directory
│   ├── app/                  # Next.js 15 App Router structure
│   │   ├── page.tsx          # Home page
│   │   ├── admin/            # Admin dashboard
│   │   │   └── analytics/    # Analytics dashboard
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth.js API routes
│   │   │   └── v1/           # API version 1 routes
│   │   │       ├── analytics/# Analytics API endpoints
│   │   │       ├── contacts/ # Contact form API endpoints
│   │   │       ├── login/    # Login endpoint
│   │   │       └── register/ # Registration endpoint
│   │   ├── gutter-installation/
│   │   ├── exterior-services/
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   └── contact/
│   ├── components/           # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   ├── ui/               # Basic UI components
│   │   ├── layout/           # Layout components
│   │   └── sections/         # Page section components
│   ├── lib/                  # Utility functions and shared logic
│   │   ├── auth/             # Authentication utilities
│   │   └── db/               # Database utilities
│   │       └── models/       # Database models
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── auth.config.ts            # NextAuth.js configuration
├── auth.ts                   # NextAuth.js setup
└── middleware.ts             # Next.js middleware for route protection
```

## Sitemap

- **Home**: Main landing page with overview of services and company
- **Gutter Installation**: Details about installation services and options
- **Gutter Services**: Information on maintenance and repair services
- **Exterior Services**: Additional exterior services offered
- **Contact Us**: Contact form and business information
- **Login**: Admin login page
- **Register**: Admin registration page
- **Admin Dashboard**: Protected admin area for site management

## Features

- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **SEO Optimization**: Meta tags, structured data, and optimized content
- **Performance Optimization**: Image optimization, code splitting, and lazy loading
- **Contact Form**: Lead generation form with validation
- **Service Galleries**: Image galleries showcasing previous work
- **Testimonials**: Customer reviews and testimonials
- **Service Area Map**: Interactive map showing service coverage areas
- **Request Quote**: Online quote request functionality
- **Authentication System**:
  - Secure admin login with JWT
  - Protected admin dashboard
  - User registration with validation
  - Password hashing and security
- **Admin Dashboard**:
  - Overview of site statistics
  - User management
  - Contact form submissions management
  - Content management (coming soon)

## Implemented Components

The following components have been implemented following TDD principles:

- **Button**: Reusable button component with support for:

  - Primary and secondary variants
  - Disabled state
  - Click event handling
  - Custom styling

- **ContactForm**: Form component with:

  - React Hook Form integration
  - Zod schema validation
  - Error message display
  - Submission handling

- **LoginForm**: Authentication form with:

  - NextAuth.js integration
  - Form validation
  - Error handling
  - Redirect after successful login

- **RegisterForm**: User registration form with:

  - Password strength validation
  - Email format validation
  - Form submission to API
  - Success/error feedback

- **Navbar**: Navigation component with:

  - Responsive design
  - Mobile menu
  - Authentication state awareness
  - Dynamic navigation links

- **AuthProvider**: Authentication context provider:

  - Session management
  - User state across the application

- **AnalyticsDashboard**: Analytics visualization component with:

  - Visitor statistics display
  - Device breakdown charts
  - Page popularity metrics
  - Interactive data filtering

- **FingerprintTracker**: Client-side tracking component:
  - Browser fingerprinting with ThumbMarkJS
  - Visit duration tracking
  - Page interaction monitoring
  - Anonymous visitor identification

## Development Workflow

### Setup and Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/texas-elite-gutters-v1.git
cd texas-elite-gutters-v1

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with the following variables:
# MONGODB_URI=your_mongodb_connection_string
# AUTH_SECRET=your_nextauth_secret_key

# Run development server
npm run dev
```

### Testing (TDD Approach)

This project follows Test-Driven Development practices:

1. Write tests first that define the expected behavior
2. Run tests to confirm they fail
3. Implement the minimum code necessary to pass the tests
4. Refactor while ensuring tests continue to pass

The testing infrastructure includes:

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing with a user-centric approach
- **User Event**: Simulating user interactions
- **Custom Test Utilities**: Wrapper for consistent test setup
- **MongoDB Memory Server**: In-memory MongoDB server for database testing
- **API Testing**: Testing API endpoints with mocked requests and responses

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests for a specific component
npm test -- __tests__/components/ui/Button.test.tsx
```

### API Endpoints

The application provides the following API endpoints:

- **POST /api/v1/register**: Register a new admin user

  - Required fields: name, email, password
  - Validates email format and password strength
  - Returns JWT token on success

- **POST /api/v1/login**: Authenticate a user

  - Required fields: email, password
  - Returns JWT token on success
  - Implements rate limiting for security

- **GET /api/auth/session**: Get the current user session

  - Used by NextAuth.js for session management
  - Returns user information if authenticated

- **POST /api/v1/contacts**: Submit a contact form

  - Required fields: name, email, phone, message
  - Validates input using Zod schema
  - Sends email notification using Nodemailer
  - Stores submission in MongoDB

- **GET /api/v1/contacts**: Retrieve all contact submissions (protected)

  - Requires authentication
  - Returns all contact form submissions

- **PUT /api/v1/contacts**: Update contact status (protected)

  - Requires authentication
  - Updates status of a contact (new, contacted, resolved, archived)

- **DELETE /api/v1/contacts**: Delete a contact submission (protected)
  - Requires authentication
  - Permanently removes a contact submission

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Deployment

The project is configured for seamless deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic preview for pull requests and production deployment for main branch

## Contributing

1. Create a feature branch from `main`
2. Write tests for new features
3. Implement features following TDD approach
4. Submit a pull request with detailed description of changes

## License

[MIT](LICENSE)
