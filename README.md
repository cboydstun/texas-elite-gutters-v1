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
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Jest and React Testing Library (TDD approach)
- **Deployment**: Vercel

## Project Structure

```
texas-elite-gutters-v1/
├── __tests__/           # Test files following TDD approach
├── app/                 # Next.js 15 App Router structure
│   ├── page.tsx         # Home page
│   ├── gutter-installation/
│   ├── gutter-cleaning-repairs/
│   ├── exterior-services/
│   └── contact/
├── components/          # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── layout/          # Layout components
│   └── sections/        # Page section components
├── lib/                 # Utility functions and shared logic
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Sitemap

- **Home**: Main landing page with overview of services and company
- **Gutter Installation**: Details about installation services and options
- **Gutter Cleaning and Repairs**: Information on maintenance and repair services
- **Exterior Services**: Additional exterior services offered
- **Contact Us**: Contact form and business information

## Features

- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **SEO Optimization**: Meta tags, structured data, and optimized content
- **Performance Optimization**: Image optimization, code splitting, and lazy loading
- **Contact Form**: Lead generation form with validation
- **Service Galleries**: Image galleries showcasing previous work
- **Testimonials**: Customer reviews and testimonials
- **Service Area Map**: Interactive map showing service coverage areas
- **Request Quote**: Online quote request functionality

## Development Workflow

### Setup and Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/texas-elite-gutters-v1.git
cd texas-elite-gutters-v1

# Install dependencies
npm install

# Run development server
npm run dev
```

### Testing (TDD Approach)

This project follows Test-Driven Development practices:

1. Write tests first that define the expected behavior
2. Run tests to confirm they fail
3. Implement the minimum code necessary to pass the tests
4. Refactor while ensuring tests continue to pass

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

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
