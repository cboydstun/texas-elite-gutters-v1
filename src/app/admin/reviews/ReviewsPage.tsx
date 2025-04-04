"use client";

import { useState, useEffect } from "react";
import { ReviewsTable } from "@/components/admin/ReviewsTable";
import { ReviewSource, ReviewData } from "@/lib/types/ReviewTypes";

// Define a client-side Review interface
interface Review {
  _id: {
    toString: () => string;
  };
  name: string;
  rating: number;
  comment: string;
  source: ReviewSource;
  createdAt: {
    toString: () => string;
  };
  updatedAt: {
    toString: () => string;
  };
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews
  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/reviews");

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        throw new Error(data.message || "Failed to fetch reviews");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update review
  const handleUpdate = async (id: string, updateData: Partial<Review>) => {
    try {
      const response = await fetch("/api/v1/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updateData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      const data = await response.json();
      if (data.success) {
        // Update the review in the local state
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id.toString() === id
              ? { ...review, ...updateData }
              : review
          )
        );
      } else {
        throw new Error(data.message || "Failed to update review");
      }
    } catch (err) {
      console.error("Error updating review:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the review"
      );
    }
  };

  // Delete review
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/reviews?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      const data = await response.json();
      if (data.success) {
        // Remove the review from the local state
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id.toString() !== id)
        );
      } else {
        throw new Error(data.message || "Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the review"
      );
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
        <div className="flex space-x-3">
          <a
            href="/admin/reviews/new"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Review
          </a>
          <button
            onClick={fetchReviews}
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <ReviewsTable
          reviews={reviews}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
