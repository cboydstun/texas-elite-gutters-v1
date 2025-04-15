import { Metadata } from "next";
import ReviewForm from "@/components/admin/ReviewForm";

export const metadata: Metadata = {
  title: "Add New Review | Admin Dashboard",
  description: "Add a new customer review",
};

export default function NewReview() {
  return <ReviewForm />;
}
