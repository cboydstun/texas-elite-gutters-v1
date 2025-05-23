import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Texas Elite Gutters & Exteriors | Home",
  description:
    "Professional gutter installation and services in San Antonio and Converse, TX. We install seamless gutters, downspouts, rain barrels, and gutter guards to protect your investment.",
  keywords:
    "gutters, gutter installation, gutter services, seamless gutters, downspouts, rain barrels, gutter guards, San Antonio, Converse, Texas",
  openGraph: {
    title: "Texas Elite Gutters & Exteriors | Home",
    description:
      "Professional gutter installation and services in San Antonio and Converse, TX. We install seamless gutters, downspouts, rain barrels, and gutter guards.",
    url: "https://texaselitegutters.com",
    siteName: "Texas Elite Gutters & Exteriors",
    images: [
      {
        url: "/hero-gutter-image.png",
        width: 1200,
        height: 630,
        alt: "Texas Elite Gutters & Exteriors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[#001F33]/80 z-10"></div>
        <div className="relative h-[600px] w-full">
          <Image
            src="/hero-gutter-image.png"
            alt="Professional Gutter Installation"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Texas Elite Gutter Installation & Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-white drop-shadow-md">
              Professional gutter installation and services in San Antonio, New
              Braunfels, Cibolo, Seguin, and surrounding areas. Protect your
              home and investment.
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

      {/* Client Showcase Section */}
      <section className="w-full py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-1/2 max-w-lg relative">
              <Image
                src="/images/oscar_ladder_3.png"
                alt="Professional on ladder performing gutter service"
                width={500}
                height={600}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="w-full md:w-1/2 max-w-lg">
              <h2 className="text-3xl font-bold mb-4 text-[#001F33]">
                San Antonio Best Gutter Service
              </h2>
              <p className="text-lg mb-6 leading-relaxed">
                At Texas Elite Gutters & Exteriors, we take pride in our
                hands-on approach to gutter installation and maintenance. Our
                experienced professionals climb the ladder so you don't have to,
                ensuring your gutters are properly installed and maintained for
                optimal performance and longevity.
              </p>
              <Link
                href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
                passHref
              >
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Schedule Your Service Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#001F33] text-[#C9A357] p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Gutter Installation</h3>
              <p className="text-gray-600 mb-4">
                Installing new gutters to protect homes.
              </p>
              <Link
                href="/gutter-installation"
                className="text-[#C9A357] font-medium hover:text-[#B08A3E] mt-auto"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#001F33] text-[#C9A357] p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Gutter Services</h3>
              <p className="text-gray-600 mb-4">
                Seamless gutters, downspouts, rain barrels, and gutter guards.
              </p>
              <Link
                href="/gutter-services"
                className="text-[#C9A357] font-medium hover:text-[#B08A3E] mt-auto"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#001F33] text-[#C9A357] p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Exterior Services</h3>
              <p className="text-gray-600 mb-4">
                Updating the exterior of homes.
              </p>
              <Link
                href="/exterior-services"
                className="text-[#C9A357] font-medium hover:text-[#B08A3E] mt-auto"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-[#001F33] text-[#C9A357] p-4 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="text-gray-600 mb-4">
                Speak with our professionals about your home.
              </p>
              <Link
                href="/contact"
                className="text-[#C9A357] font-medium hover:text-[#B08A3E] mt-auto"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#C9A357]">
            Protect Your Home with Expert Gutter Solutions
          </h2>
          <h3 className="text-xl text-center mb-8 text-[#4A4A4A]">
            Serving San Antonio, New Braunfels, Cibolo, Seguin, Boerne, Helotes,
            and surrounding areas
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Water can cause significant damage to your home's structure and
              foundation over time. At Texas Elite Gutters & Exteriors, we
              design custom gutter systems by carefully analyzing your roof's
              shape, pitch, overhang, and valleys to ensure both functionality
              and aesthetic appeal. Our Solutionists will assess your specific
              needs and create a tailored plan for your seamless gutter
              installation or replacement.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              We use cutting-edge technology and premium materials to implement
              effective water management solutions that protect your property
              from foundation damage and landscape erosion. Don't wait for the
              next storm to damage your biggest investment. Request your
              comprehensive property assessment today.
            </p>
            <div className="text-center">
              <Link
                href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
                passHref
              >
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Claim Your Free Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            What Our Customers Are Saying
          </h3>
          <div className="max-w-6xl mx-auto">
            <ReviewsCarousel />
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="w-full py-16 bg-[#FFFFFF]">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            We Know Rain Gutters
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              When designing and installing gutters on your property, we
              consider every detail - from roofline and pitch to overhang,
              fascia, and valleys. Our comprehensive approach ensures your
              gutter system not only functions perfectly but also enhances your
              home's appearance.
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
                  <span className="font-semibold text-[#C9A357]">
                    Gutter services:
                  </span>{" "}
                  Installation, cleaning, maintenance, and repair of seamless
                  gutters, downspouts, rain barrels, and gutter guards.
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
                  <span className="font-semibold text-[#C9A357]">
                    Exterior solutions:
                  </span>{" "}
                  Building pergolas, gazebos, patios, fences, decks, and other
                  exterior enhancements to complement your gutter system.
                </span>
              </li>
            </ul>
            <p className="text-lg mb-6 leading-relaxed">
              Your home is a personal investment, and we offer personal
              solutions. Our professional gutter experts will assess your unique
              situation and propose the best considerations for your property.
              Call{" "}
              <a
                href="tel:210-835-7520"
                className="text-[#C9A357] font-semibold hover:text-[#B08A3E]"
              >
                210-835-7520
              </a>{" "}
              today to schedule your consultation.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Community-Minded, Customer-Focused
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              At Texas Elite Gutters &amp; Exteriors, we prioritize our
              customers' needs above all else. We're a community-minded,
              customer-focused gutter contractor who believes in investing in
              our workers and delivering 5-star service to every client. Our
              core values of honesty, integrity, and transparency guide
              everything we do.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              We're committed to publishing all reviews—positive or negative—to
              maintain accountability and continuously improve our service. This
              commitment to excellence has earned us a large number of returning
              clients, friends, and neighbors throughout San Antonio, New
              Braunfels, Cibolo, Seguin, Boerne, Helotes, and surrounding areas.
              Some of them may even be your neighbors!
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Experience the difference of working with a gutter contractor who
              truly cares about your home and community. Contact us today to
              discuss your gutter and exterior needs.
            </p>
            <div className="text-center">
              <Link href="/contact" passHref>
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Commitment Section */}
      <section className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Your Trusted Gutter Service Provider
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
            <div className="w-full md:w-2/3 md:pr-12">
              <p className="text-lg mb-6 leading-relaxed">
                We strive to be the premier gutter contractor serving all your
                needs across San Antonio, Cibolo, New Braunfels, Seguin, and
                surrounding Texas communities. Our commitment to excellence is
                built on investing in our team members, ensuring they have the
                skills and resources to deliver consistently outstanding results
                for every project.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Transparency is at the heart of our business philosophy. We
                publish every customer review—whether glowing or
                critical—because we believe in accountability and continuous
                improvement. This approach not only keeps us honest but also
                helps us identify opportunities to enhance our service quality.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Our dedication to quality workmanship and exceptional customer
                service has built a loyal client base throughout the region.
                Many of our new customers come through referrals from satisfied
                homeowners who appreciate our integrity, attention to detail,
                and commitment to doing the job right the first time.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center items-center mt-8 md:mt-0">
              <div className="relative w-96 h-96">
                <Image
                  src="/images/BCC_Member_Badge_1_.png"
                  alt="Better Business Bureau Member"
                  fill
                  className="object-contain"
                />
              </div>
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
            Contact us today for a free quote on your gutter installation or
            services project.
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
