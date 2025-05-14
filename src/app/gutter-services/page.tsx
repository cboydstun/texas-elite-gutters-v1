import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top-Notch Gutter Services | Texas Elite Gutters & Exteriors",
  description:
    "Professional gutter services in San Antonio, New Braunfels, Cibolo, Seguin, and surrounding areas. Installation, cleaning, repair, replacement, and inspection services.",
  keywords:
    "gutter services, gutter installation, gutter cleaning, gutter repair, gutter replacement, gutter inspection, seamless gutters, San Antonio, New Braunfels, Cibolo, Seguin, Texas",
  openGraph: {
    title: "Top-Notch Gutter Services | Texas Elite Gutters & Exteriors",
    description:
      "Professional gutter services in San Antonio and surrounding areas. Installation, cleaning, repair, replacement, and inspection services.",
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
              Top-Notch Gutter Services from the Experts
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-white drop-shadow-md">
              Professional gutter services in San Antonio, New Braunfels,
              Cibolo, Seguin, and surrounding areas
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
              Texas Elite Gutters & Exteriors offers superior gutter services in
              San Antonio, New Braunfels, Cibolo, Seguin, and surrounding areas.
              We have years of hands-on industry experience and a team of highly
              qualified gutter experts who can handle everything, from
              installing new gutters to cleaning, repairing, and replacing old
              systems.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              We guarantee quality work, excellent customer service, and
              affordable rates whenever you choose our services. Our
              professionals use only the best materials and industry-leading
              products to provide long-lasting durability and performance for
              your home or commercial building's gutters.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              We know the importance of gutters in every home or business
              premise. Apart from protecting a building and its foundation from
              water damage, gutters prevent flooding and protect landscaping by
              collecting rainwater from the building. Our experts provide
              top-notch gutter solutions to care for your home or business
              needs.
            </p>
            <div className="text-center my-8">
              <a href="tel:210-835-7520" className="inline-block">
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Call 210-835-7520 for a FREE Estimate
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Comprehensive Range of Gutter Services
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              At Texas Elite Gutters & Exteriors, we offer a wide range of
              gutter solutions for residential, commercial, and industrial
              applications. Our technicians can help you make the best decision
              when selecting the suitable material, design, and style for your
              property's gutters. We guarantee durable and dependable results
              that meet all your demands without breaking your budget.
            </p>

            <div className="mt-10 mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Gutter Installation Services
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                We're a highly professional team with skills, tools, and
                experience installing all types of gutters. Our technicians can
                install gutter systems for any size and type of home or
                commercial property. We provide a seamless installation process
                with no mess or damage to your property. Call us to install
                seamless, K-style, half-round gutters and more.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Gutter Cleaning Services
              </h4>
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                <div className="w-full md:w-1/2">
                  <p className="text-lg leading-relaxed">
                    We provide complete gutter cleaning services to protect your
                    building against water damage. Our experts properly remove
                    the dirt and debris from your gutters and ensure they are
                    free from clogs. We use advanced techniques and tools to
                    remove all debris, leaves, twigs, and other elements from
                    the gutter system safely and efficiently.
                  </p>
                </div>
                <div className="w-full md:w-1/2 max-w-md">
                  <Image
                    src="/images/IMG_3302-min.png"
                    alt="Professional gutter cleaning service"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
              <p className="text-lg leading-relaxed">
                We also inspect the guttering system after cleaning to identify
                potential problems that may arise later, ensuring your gutters
                remain in optimal condition.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Gutter Repair Services
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                If you have damaged or broken gutters, our technicians can
                repair them quickly and professionally. We use only high-quality
                products for repairs so that your gutters last longer and
                perform better than before. Whether you need minor repairs due
                to normal wear and tear or significant repairs due to storm
                damage, our team is here to help. We'll evaluate the current
                condition of the gutter system in your property quickly before
                providing effective repair solutions.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Gutter Replacement
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                If your property has extensively damaged gutters, our
                technicians may recommend replacement. Once you approve gutter
                replacement, we will use the best products and tools to replace
                the entire gutter system. Our experts will provide a safe and
                efficient installation process for your gutter systems.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
                Gutter Inspection
              </h4>
              <p className="text-lg mb-6 leading-relaxed">
                Gutter inspection is vital to ensure your property remains safe
                from water damage. Our technicians will inspect your gutters
                thoroughly and identify any issues that need attention. We use
                innovative techniques and technologies to examine the guttering
                system, including video inspections. After the inspection, we
                will promptly provide the most appropriate solutions to your
                gutter problems. With our inspection services, ensure your
                property is in a suitable condition and free from potential
                damage.
              </p>
            </div>

            <p className="text-lg mb-6 leading-relaxed">
              We understand that each gutter system is unique and requires
              specialized solutions to ensure long-term performance. That's why
              we strive to provide complete satisfaction with all of our gutter
              services. Our team will go the extra mile to guarantee you get the
              most out of our services.
            </p>

            <div className="text-center mt-8">
              <a href="tel:210-835-7520" className="inline-block">
                <Button variant="primary" className="px-8 py-3 shadow-lg">
                  Call 210-835-7520 for a FREE Estimate
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Professional Services Section */}
      <section className="w-full bg-[#FFFFFF] py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Why You Need Professional Gutter Services
          </h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              Gutter systems are an essential part of your home or business
              property. Thus, you must maintain them in good condition to
              protect the building from water damage. Professional gutter
              services from Texas Elite Gutters & Exteriors will help you ensure
              optimal performance and longevity for your gutters. We provide
              superior work and use high-grade materials for all our services.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              We strive to ensure you get the highest-quality gutter solutions
              for your property whenever you enlist our services. We have
              experienced technicians that can expertly handle all types of
              gutter jobs. Our team works with all kinds of gutters, such as
              aluminum, galvanized steel, copper, tall seamless gutters, K-style
              gutters, half-round gutters, and more.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Also, we can help you choose the right type of gutter system for
              your home or business property and ensure its proper installation
              and maintenance. Besides these services, we provide gutter
              protection systems that keep debris and leaves out of the gutters
              without affecting their performance.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our commitment to excellence and customer satisfaction sets us
              apart from other gutter companies. We value professionalism and
              strive to provide quality work at competitive prices so that you
              get the best value for your money. So if you are looking for
              top-notch gutter services, get in touch with us today.
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
            Let Gutter Experts Handle Your Project Now!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Do you need help with gutter problems or installation? Look no
            further than Texas Elite Gutters & Exteriors. Our team of
            professionals can handle all types of gutter projects quickly and
            efficiently. We offer free estimates and competitive rates for our
            services, so don't hesitate to reach out to us today.
          </p>
          <Link
            href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
            passHref
          >
            <Button
              variant="secondary"
              className="px-8 py-4 font-bold text-lg shadow-lg"
            >
              Schedule Your Free Estimate
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
