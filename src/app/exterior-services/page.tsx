import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Windows, Siding, Doors & Exterior Services | Texas Elite Gutters & Exteriors",
  description:
    "Professional exterior remodeling services in San Antonio and surrounding areas. Windows, siding, doors, exterior painting, and construction services to enhance your home.",
  keywords:
    "exterior services, windows, siding, doors, exterior painting, construction, remodeling, San Antonio, Texas, Southwest Texas",
  openGraph: {
    title:
      "Windows, Siding, Doors & Exterior Services | Texas Elite Gutters & Exteriors",
    description:
      "Professional exterior remodeling services in San Antonio and surrounding areas. Windows, siding, doors, exterior painting, and construction services.",
    url: "https://texaselitegutters.com/exterior-services",
    siteName: "Texas Elite Gutters & Exteriors",
    images: [
      {
        url: "/hero-gutter-image.png",
        width: 1200,
        height: 630,
        alt: "Exterior Remodeling Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ExteriorServices() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[#001F33]/80 z-10"></div>
        <div className="relative h-[400px] w-full">
          <Image
            src="/hero-gutter-image.png"
            alt="Exterior Services"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
          />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
              San Antonio Windows, Siding, Doors & Exterior Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-white drop-shadow-md">
              Reputable Exterior Remodeling Contractor Serving Southwest Texas
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
              Texas Elite Gutters &amp; Exteriors is proud to be your trusted
              partner for doors, windows, siding, exterior painting, and
              construction in San Antonio! From installing new doors to
              replacing inefficient windows, our goal is to create a home you'll
              love coming home to.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              When you choose us for your exterior needs in Southwest Texas,
              you'll benefit from our experience and fast, friendly service.
              With our satisfaction guarantee, warranty, and competitive
              pricing, we make it easy to enjoy a beautiful and comfortable
              living space without breaking the bank!
            </p>
            <div className="text-center my-8">
              <Link href="/contact" passHref>
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Contact us today for your exterior project needs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            How We Help
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Texas Elite Gutters & Exteriors is committed to optimizing your
              home comfort with effective and tailored solutions. Our
              comprehensive services include:
            </p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Windows
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                Upgrade your home with high-quality windows! From brand-new
                installations to replacements, we offer a variety of
                industry-leading options to complement your living space while
                reducing energy costs.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Siding
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                Protect your home while boosting its visual appeal with our
                premium siding solutions. Our expert installers repair and
                install siding and fascia using durable materials for lasting
                performance.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Doors
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                Our team offers a wide selection of stylish, durable, and
                energy-efficient doors to enhance your home's curb appeal and
                security. Whether you're looking for entry doors, patio doors,
                or sliding glass doors, our experts are fully equipped to handle
                new installations with care and precision.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Exterior Painting
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                <div className="w-full md:w-1/2">
                  <p className="text-lg leading-relaxed">
                    Transform your home with our professional exterior painting
                    services! Enjoy a fresh, long-lasting finish with high-quality
                    paint products built to withstand the Texas heat without fading,
                    chipping, or peeling.
                  </p>
                </div>
                <div className="w-full md:w-1/2 max-w-md">
                  <Image
                    src="/IMG_3393-min.jpg"
                    alt="Professional exterior painting service"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Outdoor Living Spaces
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                Enhance your outdoor living experience with our custom-built
                structures:
              </p>
              <ul className="list-none space-y-4 mb-8 ml-6">
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
                  <span className="text-lg">Design and build pergolas</span>
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
                  <span className="text-lg">Build gazebos and decks</span>
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
                  <span className="text-lg">Install and paint fences</span>
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
                  <span className="text-lg">Build patios</span>
                </li>
              </ul>
            </div>

            <p className="text-lg mb-6 leading-relaxed">
              We will meet with you in person to go over your project and space.
              Then, we will create a timeline for your project and manage it
              from start to finish. We always make sure we are neat and clean
              when updating spaces and will protect your home and clean up your
              property, disposing of any waste. Lastly, we will walk your
              property with you to make sure you are fully satisfied with our
              work.
            </p>
            <div className="text-center mt-8">
              <Link href="/contact" passHref>
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Contact us today about your exterior project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-[#FFFFFF] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#C9A357]">
                Why Hire Texas Elite Gutters & Exteriors?
              </h3>
              <p className="text-lg mb-6 leading-relaxed">
                When you choose Texas Elite Gutters & Exteriors, you're choosing
                quality and integrity. Here are some benefits of partnering with
                our experienced professionals:
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
                    <span className="font-semibold">
                      Satisfaction guarantee
                    </span>{" "}
                    – We know our job isn't finished until you're happy with our
                    work
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
                    <span className="font-semibold">Lifetime warranty</span> –
                    Enjoy lasting peace of mind for as long as you own your home
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
                    <span className="font-semibold">Top-quality products</span>{" "}
                    – With high-quality products from industry-leading brands
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
                    <span className="font-semibold">Competitive pricing</span> –
                    Enjoying a beautiful living space shouldn't break the bank
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-center text-[#C9A357]">
                Can Remodeling My Home Increase its Value?
              </h3>
              <p className="text-lg mb-6 leading-relaxed">
                Ready to have the best-looking home on the block? With our
                top-notch remodeling services, you can not only improve your
                home's functionality and appearance but also increase its resale
                value, making it more desirable to prospective buyers if you
                decide to sell in the future.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Whether you're looking to modernize your exterior, update your
                windows and doors, or enhance your outdoor living space, our
                contractors are fully equipped to handle your next remodeling
                project with ease!
              </p>
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
            Contact us today for a free quote on your exterior services project.
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
