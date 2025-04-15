import { Metadata } from "next";
import FAQPage from "./FAQPage";

export const metadata: Metadata = {
  title: "Manage FAQs | Admin Dashboard",
  description: "Manage frequently asked questions",
};

export default function FAQs() {
  return <FAQPage />;
}
