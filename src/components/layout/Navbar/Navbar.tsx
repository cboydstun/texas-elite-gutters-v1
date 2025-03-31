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
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav
      className={`bg-[#001525] shadow-md py-4 border-b-2 border-[#C9A357]/20 ${className}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/texas-elite-gutters-logo.jpg"
            alt="Texas Elite Gutters & Exteriors"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            Home
          </Link>
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
          <Link
            href="/exterior-services"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            Exterior Services
          </Link>
          <Link
            href="/contact"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium"
          >
            Contact Us
          </Link>
        </div>

        {/* Contact Info & Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-[#FFFFFF]">
            <span className="font-bold">Call Us: </span>
            <a href="tel:210-835-7520" className="hover:text-[#C9A357]">
              210-835-7520
            </a>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-[#FFFFFF] hover:text-[#C9A357]">
                Admin Dashboard
              </Link>
              <Button variant="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Link href="/login" passHref>
              <Button variant="secondary">Admin Login</Button>
            </Link>
          )}
          
          <Link
            href="https://book.housecallpro.com/book/Texas-Elite-Gutters--Exteriors/f0824bdbed0a420caec0e991163d1246?v2=true"
            passHref
          >
            <Button variant="primary">Get a Quote</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#FFFFFF]"
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

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-[#001525] border-t border-[#001F33] py-2`}
        data-testid="mobile-menu"
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          <Link
            href="/"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
          >
            Home
          </Link>
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
            href="/contact"
            className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
          >
            Contact Us
          </Link>
          <div className="text-[#FFFFFF] py-2">
            <span className="font-bold">Call Us: </span>
            <a href="tel:210-835-7520" className="hover:text-[#C9A357]">
              210-835-7520
            </a>
          </div>
          {/* Auth links for mobile */}
          {isAuthenticated ? (
            <>
              <Link
                href="/admin"
                className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2 text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-[#FFFFFF] hover:text-[#C9A357] font-medium py-2"
            >
              Admin Login
            </Link>
          )}
          
          <div className="py-2">
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
