import { Metadata } from "next";
import ReviewsPage from "./ReviewsPage";

export const metadata: Metadata = {
  title: "Manage Reviews | Admin Dashboard",
  description: "Manage customer reviews",
};

export default function Reviews() {
  return <ReviewsPage />;
}
