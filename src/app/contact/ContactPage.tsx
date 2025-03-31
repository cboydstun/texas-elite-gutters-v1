"use client";

import Image from "next/image";
import { ContactForm } from "@/components/ui/ContactForm";

export default function ContactPage() {
  const handleFormSubmit = (data: {
    message: string;
    name: string;
    email: string;
    phone: string;
  }) => {
    // In a real application, this would send the data to a server
    console.log("Form submitted:", data);
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[#001F33]/80 z-10"></div>
        <div className="relative h-[300px] w-full">
          <Image
            src="/hero-gutter-image.png"
            alt="Contact Us"
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-white drop-shadow-md">
              Get in touch with our team for a free quote on your project
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#C9A357]">
                Get In Touch
              </h2>
              <p className="text-lg mb-8">
                We are here to answer any questions you may have about our
                services. Reach out to us and we will respond as soon as we can.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#001F33] text-[#C9A357] p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <a
                      href="tel:210-835-7520"
                      className="text-[#C9A357] hover:text-[#B08A3E]"
                    >
                      210-835-7520
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#001F33] text-[#C9A357] p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Service Areas</h3>
                    <p>San Antonio, TX</p>
                    <p>Converse, TX</p>
                    <p>And surrounding areas</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#001F33] text-[#C9A357] p-3 rounded-full mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Business Hours</h3>
                    <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                    <p>Saturday: By Appointment Only</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#C9A357]">
                Send Us a Message
              </h2>
              <p className="text-lg mb-8">
                Fill out the form below and we will get back to you as soon as
                possible.
              </p>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-[#5B8DB1]/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#C9A357]">
            Our Service Area
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              {/* In a real application, this would be a Google Maps embed */}
              <div className="flex items-center justify-center h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627674.5117588796!2d-98.72937967878471!3d29.515311485813527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x266f160834edcd97%3A0xe478e1d52f206c8a!2sTexas%20Elite%20Gutters%20%26%20Exteriors!5e1!3m2!1sen!2sus!4v1743112334035!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
