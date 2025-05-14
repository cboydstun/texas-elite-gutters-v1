import { Metadata } from "next";
import FAQPage from "./FAQPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Texas Elite Gutters & Exteriors",
  description:
    "Find answers to common questions about our gutter installation, repair, and maintenance services.",
};

export default function FAQ() {
  return <FAQPage />;
}
