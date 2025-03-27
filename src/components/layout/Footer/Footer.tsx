"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-[#001525] text-[#FFFFFF] py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C9A357]">
              Texas Elite Gutters & Exteriors
            </h3>
            <p className="mb-2">
              Professional gutter installation and repair services
            </p>
            <p className="mb-4">Serving San Antonio and Converse, TX</p>
            <div className="flex items-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              <a href="tel:210-835-7520" className="hover:text-[#C9A357]">
                210-835-7520
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C9A357]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#C9A357]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gutter-installation"
                  className="hover:text-[#C9A357]"
                >
                  Gutter Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/gutter-cleaning-repairs"
                  className="hover:text-[#C9A357]"
                >
                  Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link
                  href="/exterior-services"
                  className="hover:text-[#C9A357]"
                >
                  Exterior Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C9A357]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#C9A357]">
              Service Areas
            </h3>
            <ul className="space-y-2">
              <li>San Antonio, TX</li>
              <li>Converse, TX</li>
              <li>And surrounding areas</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#001F33] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {currentYear} Texas Elite Gutters & Exteriors. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p>
              <span className="font-bold text-[#C9A357]">Copyright</span>{" "}
              {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
