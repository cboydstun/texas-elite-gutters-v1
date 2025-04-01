import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gutter Services | Texas Elite Gutters & Exteriors",
  description:
    "Professional gutter services in San Antonio and Converse, TX. We install seamless gutters, downspouts, rain barrels, and gutter guards to protect your home.",
  keywords:
    "gutter services, seamless gutters, downspouts, rain barrels, gutter guards, San Antonio, Converse, Texas",
  openGraph: {
    title: "Gutter Services | Texas Elite Gutters & Exteriors",
    description:
      "Professional gutter services in San Antonio and Converse, TX. We install seamless gutters, downspouts, rain barrels, and gutter guards.",
    url: "https://texaselitegutters.com/gutter-services",
    siteName: "Texas Elite Gutters & Exteriors",
    images: [
      {
        url: "/hero-gutter-image.png",
        width: 1200,
        height: 630,
        alt: "Professional Gutter Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function GutterServices() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[#001F33]/80 z-10"></div>
        <div className="relative h-[400px] w-full">
          <Image
            src="/hero-gutter-image.png"
            alt="Professional Gutter Services"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Complete Gutter Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-white drop-shadow-md">
              Professional gutter services in San Antonio and Converse, TX
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
                passHref
              >
                <Button
                  variant="secondary"
                  className="font-bold px-8 py-4 text-lg transform hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Get a Project Evaluation Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full bg-[#FFFFFF] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Protect your property with comprehensive gutter solutions from
              Texas Elite Gutters Exteriors. We provide professional gutter
              services throughout San Antonio and Converse, TX. Our expert team
              specializes in installing seamless gutters, downspouts, rain
              barrels, and gutter guards to create a complete water management
              system for your home. We focus on quality installations that
              prevent water damage and protect the foundation of your property,
              the landscaping, and other exterior features.
            </p>
            <div className="text-center my-8">
              <a href="tel:210-835-7520" className="inline-block">
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Call 210-835-7520 for professional gutter services
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Comprehensive Gutter Solutions
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Our professional gutter services include:
            </p>
            <ul className="list-none space-y-4 mb-8">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#C9A357] mr-2 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">
                  <span className="font-semibold">Seamless Gutters:</span>{" "}
                  Custom-fabricated on-site to fit your home perfectly, reducing
                  leaks and clogs
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#C9A357] mr-2 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">
                  <span className="font-semibold">Downspouts:</span>{" "}
                  Strategically placed to direct water away from your foundation
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#C9A357] mr-2 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">
                  <span className="font-semibold">Rain Barrels:</span>{" "}
                  Eco-friendly water collection systems that conserve water for
                  landscaping
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 text-[#C9A357] mr-2 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg">
                  <span className="font-semibold">Gutter Guards:</span>{" "}
                  Protective systems that prevent debris buildup while allowing
                  water to flow freely
                </span>
              </li>
            </ul>
            <p className="text-lg mb-6 leading-relaxed">
              We provide a comprehensive consultation to assess the specific
              needs of your property and recommend the ideal gutter solution.
              Our professional installation ensures your system works
              efficiently to protect your home from water damage. All our work
              comes with a lifetime warranty on workmanship for your peace of
              mind.
            </p>
            <div className="text-center mt-8">
              <Link href="/contact" passHref>
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Contact us for professional gutter services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-[#001F33] text-[#FFFFFF] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F33] to-[#003A5C] opacity-80"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-[#C9A357]">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote on your gutter services project.
          </p>
          <Link
            href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
            passHref
          >
            <Button
              variant="secondary"
              className="px-8 py-4 font-bold text-lg shadow-lg"
            >
              Get Your Project Evaluation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
