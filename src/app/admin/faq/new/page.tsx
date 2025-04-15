import { Metadata } from "next";
import FAQForm from "@/components/admin/FAQForm";

export const metadata: Metadata = {
  title: "Add New FAQ | Admin Dashboard",
  description: "Add a new frequently asked question",
};

export default function NewFAQ() {
  return <FAQForm />;
}
