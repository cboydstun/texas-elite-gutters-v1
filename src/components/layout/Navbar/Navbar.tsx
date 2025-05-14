"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className={`bg-[#001525] shadow-md py-4 border-b-2 border-[#C9A357]/20 ${className}`}
    >
      <div className="container mx-auto px-4 flex justify-around items-center">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/gutter-installation"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            Gutter Installation
          </Link>
          <Link
            href="/gutter-services"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            Gutter Services
          </Link>
        </div>

        {/* Centered Logo */}
        <div className="hidden md:flex justify-center items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/texas-elite-gutters-logo-transparent.png"
              alt="Texas Elite Gutters & Exteriors"
              width={220}
              height={80}
              className="h-48 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/exterior-services"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            Exterior Services
          </Link>
          <Link
            href="/faq"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            FAQ
          </Link>
        </div>

        {/* Mobile Elements */}
        <div className="md:hidden flex items-center justify-between w-full">
          {/* Mobile Logo (smaller) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/texas-elite-gutters-logo-transparent.png"
              alt="Texas Elite Gutters & Exteriors"
              width={160}
              height={60}
              className="h-32 w-auto"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="text-[#FFFFFF]"
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Contact Info & Quote Button - Desktop */}
      <div className="hidden md:flex justify-center items-center mt-4 space-x-6">
        <div className="text-[#FFFFFF]">
          <span className="font-bold">Call Us: </span>
          <a href="tel:210-835-7520" className="hover:text-[#C9A357]">
            210-835-7520
          </a>
        </div>

        <Link
          href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
          passHref
        >
          <Button variant="primary">Get a Quote</Button>
        </Link>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-[#001525] border-t border-[#001F33] py-2`}
        data-testid="mobile-menu"
      >
        <div className="container mx-auto px-4 flex flex-col items-center space-y-3">
          <Link
            href="/gutter-installation"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
          >
            Gutter Installation
          </Link>
          <Link
            href="/gutter-services"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
          >
            Gutter Services
          </Link>
          <Link
            href="/exterior-services"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
          >
            Exterior Services
          </Link>
          <Link
            href="/faq"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
          >
            FAQ
          </Link>
          <div className="text-[#FFFFFF] py-2">
            <span className="font-bold">Call Us: </span>
            <a href="tel:210-835-7520" className="hover:text-[#C9A357]">
              210-835-7520
            </a>
          </div>
          <div className="py-2 w-full">
            <Link
              href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
              passHref
            >
              <Button variant="primary" className="w-full">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
