import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Seamless Aluminum Gutter Installation | Texas Elite Gutters & Exteriors",
  description:
    "Professional seamless aluminum gutter installation in San Antonio, New Braunfels, Cibolo, Seguin, Boerne, Helotes, and surrounding areas. Durable, low-maintenance systems with lifetime warranty.",
  keywords:
    "gutter installation, seamless gutters, aluminum gutters, gutter guards, downspout installation, San Antonio, New Braunfels, Cibolo, Seguin, Texas",
  openGraph: {
    title:
      "Seamless Aluminum Gutter Installation | Texas Elite Gutters & Exteriors",
    description:
      "Professional seamless aluminum gutter installation in San Antonio and surrounding areas. Durable, low-maintenance systems with lifetime warranty.",
    url: "https://texaselitegutters.com/gutter-installation",
    siteName: "Texas Elite Gutters & Exteriors",
    images: [
      {
        url: "/hero-gutter-image.png",
        width: 1200,
        height: 630,
        alt: "Seamless Aluminum Gutter Installation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function GutterInstallation() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[#001F33]/80 z-10"></div>
        <div className="relative h-[400px] w-full">
          <Image
            src="/hero-gutter-image.png"
            alt="Gutter Installation Services"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              Seamless Aluminum Gutter System
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-white drop-shadow-md">
              Durable, low-maintenance gutters custom-fit to your home in San
              Antonio, New Braunfels, Cibolo, Seguin, Boerne, Helotes, and surrounding areas
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
              Having a reliable, durable gutter system is vital to the
              protection of your home's exterior and interior. If you have a
              clogged, leaky, or poorly maintained gutter system in place, it
              can lead to serious water damage around your roof, siding,
              basement, foundation, and more. Plus, an open, unkept gutter
              system can be a breeding ground for pests, dirt, leaves, and other
              outdoor debris.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              A heavy-duty gutter system that's properly installed and
              maintained can help eliminate these issues from occurring. At
              Texas Elite Gutters & Exteriors, we install seamless aluminum
              gutters that not only make gutter cleaning a thing of the past,
              but also protect your home from unnecessary damage caused by
              poorly installed gutters.
            </p>
            <div className="text-center my-8">
              <Link
                href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
                passHref
              >
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Schedule Your Free Project Evaluation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Gutter Installation Is Important */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Why Gutter Installation Is Important
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Properly installed gutters help direct rainwater away from your
              home to avoid pooling water, flooding, and other structural damage
              in and around your property. Unfortunately, homeowners don't often
              think about the integrity of their gutter system until there is a
              problem.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              If your gutters are loose, clogged, or aren't securely attached to
              your fascia, your home is prone to damage from the elements. Water
              damage could lead to structural issues, such as wood rot and
              mildew, in your basement, under your roof and siding, and around
              your foundation.
            </p>
            <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
              Proper gutter installation can prevent:
            </h4>
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
                <span className="text-lg">Flooded landscaping</span>
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
                  Mold, mildew, and rotting wood around window frames,
                  foundation support joists, and basement walls & floors
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
                  Wood rot & mildew damage under your roof & siding
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
                  Attracts pests like mosquitoes, roaches, ants, termites, and even rodents due to standing water and moisture-damaged wood around your home
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
                  Soil erosion around your home's foundation caused by uncontrolled water runoff
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
                  Staining and discoloration of siding, brick, or stucco from constant water exposure
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
                  Foundation settling and structural shifts over time from chronic water pooling
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
                  Increased home maintenance costs due to long-term water damage and pest issues
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
                  Decreased curb appeal and property value caused by visible gutter overflow, stains, and water damage
                </span>
              </li>
            </ul>
            <div className="text-center mt-8">
              <Link
                href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
                passHref
              >
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Schedule Your Free Project Evaluation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Benefits of Our Seamless Aluminum Gutter Installation
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Proper installation and superior gutters make all the difference
              for your home. When you choose Texas Elite Gutters & Exteriors,
              you'll get an innovative, no-clog gutter system that will protect
              your home against all weather conditions. Our system is made to
              last year after year and is backed by industry-leading warranties.
            </p>
            <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
              Our installation benefits include:
            </h4>
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
                  Elimination of annual gutter cleaning
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
                  Premium-grade aluminum material that won't flex
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
                  6" gutter size that carries 20% more water than standard 5"
                  gutters
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
                  Sturdy brackets that support the front, back, and hood of
                  gutter system
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
                  Range of colors to match your home
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
                  A no-clog, sag, or pull away guarantee
                </span>
              </li>
            </ul>
            <p className="text-lg mb-6 leading-relaxed">
              When you choose Texas Elite Gutters & Exteriors, we'll provide a
              free onsite project evaluation for gutter installation on your property. Our
              gutters come with a lifetime warranty and are guaranteed to sag.
            </p>
            <div className="text-center mt-8">
              <Link
                href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
                passHref
              >
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Schedule Your Free Project Evaluation
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
            Protect Your Home with Quality Gutters
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your free onsite project evaluation for gutter installation today
            with one of our professional gutter specialists. You'll receive an
            in-person evaluation of your existing gutter system and discuss
            options that would best suit your home.
          </p>
          <Link
            href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
            passHref
          >
            <Button
              variant="secondary"
              className="px-8 py-4 font-bold text-lg shadow-lg"
            >
              Schedule Your Free Project Evaluation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
