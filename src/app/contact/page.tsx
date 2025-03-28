import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Texas Elite Gutters & Exteriors",
  description:
    "Contact Texas Elite Gutters & Exteriors for professional gutter and exterior services in San Antonio and Converse, TX. Get a free quote today.",
  keywords:
    "contact, free quote, gutter services, exterior services, San Antonio, Converse, Texas",
  openGraph: {
    title: "Contact Us | Texas Elite Gutters & Exteriors",
    description:
      "Contact us for professional gutter and exterior services in San Antonio and Converse, TX.",
    url: "https://texaselitegutters.com/contact",
    siteName: "Texas Elite Gutters & Exteriors",
    images: [
      {
        url: "/hero-gutter-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Texas Elite Gutters & Exteriors",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Contact() {
  return <ContactPage />;
}
