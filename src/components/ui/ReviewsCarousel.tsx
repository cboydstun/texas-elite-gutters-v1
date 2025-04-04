"use client";

import { useState, useEffect } from "react";
import { ReviewSource } from "@/lib/types/ReviewTypes";

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  source: ReviewSource;
  createdAt: string;
  updatedAt: string;
}

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
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
        console.error("Error fetching reviews:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-[#C9A357]">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-5 h-5"
            fill={star <= rating ? "currentColor" : "#D1D5DB"}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // If there are no reviews, show a fallback
  if (!isLoading && (reviews.length === 0 || error)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Fallback testimonials */}
        <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="flex text-[#C9A357]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            "These guys were great, no nonsense, very professional. They repaired and replaced all damaged gutters on the property. Thanks to your team!"
          </p>
          <div className="font-semibold text-[#4A4A4A]">Chris Jenkins</div>
          <div className="text-sm text-gray-500">August 11, 2024</div>
        </div>

        <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="flex text-[#C9A357]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            "The whole experience was first rate. They stuck with their quote, showed up on time, did the work expeditiously and did a quality job. What else is there?"
          </p>
          <div className="font-semibold text-[#4A4A4A]">David Peterson</div>
          <div className="text-sm text-gray-500">July 13, 2024</div>
        </div>

        <div className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="flex text-[#C9A357]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            "Quality service and friendly people. They were fast and solved my problem with expertise. Would recommend at any time."
          </p>
          <div className="font-semibold text-[#4A4A4A]">Aline Diniz</div>
          <div className="text-sm text-gray-500">March 1, 2024</div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#C9A357]"></div>
      </div>
    );
  }

  // Show dynamic reviews
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <div key={review._id} className="bg-[#F8F9FA] p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-gray-500">via {review.source}</span>
          </div>
          <p className="text-gray-700 mb-4">{review.comment}</p>
          <div className="font-semibold text-[#4A4A4A]">{review.name}</div>
          <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
        </div>
      ))}
    </div>
  );
}
