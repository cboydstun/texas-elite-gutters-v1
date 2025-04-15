"use client";

import { useState, useEffect } from "react";
import { FAQTable } from "@/components/admin/FAQTable";

// Define a client-side FAQ interface
interface FAQ {
  _id: {
    toString: () => string;
  };
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: {
    toString: () => string;
  };
  updatedAt: {
    toString: () => string;
  };
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQs
  const fetchFAQs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/faq");

      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }

      const data = await response.json();
      if (data.success) {
        setFaqs(data.faqs);
      } else {
        throw new Error(data.message || "Failed to fetch FAQs");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching FAQs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update FAQ
  const handleUpdate = async (id: string, updateData: Partial<FAQ>) => {
    try {
      const response = await fetch("/api/v1/faq", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updateData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update FAQ");
      }

      const data = await response.json();
      if (data.success) {
        // Update the FAQ in the local state
        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq._id.toString() === id
              ? { ...faq, ...updateData }
              : faq
          )
        );
      } else {
        throw new Error(data.message || "Failed to update FAQ");
      }
    } catch (err) {
      console.error("Error updating FAQ:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the FAQ"
      );
    }
  };

  // Delete FAQ
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/faq?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete FAQ");
      }

      const data = await response.json();
      if (data.success) {
        // Remove the FAQ from the local state
        setFaqs((prevFaqs) =>
          prevFaqs.filter((faq) => faq._id.toString() !== id)
        );
      } else {
        throw new Error(data.message || "Failed to delete FAQ");
      }
    } catch (err) {
      console.error("Error deleting FAQ:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the FAQ"
      );
    }
  };

  // Toggle FAQ published status
  const handleTogglePublished = async (id: string, isPublished: boolean) => {
    try {
      await handleUpdate(id, { isPublished });
    } catch (err) {
      console.error("Error toggling FAQ published status:", err);
    }
  };

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <div className="flex space-x-3">
          <a
            href="/admin/faq/new"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add FAQ
          </a>
          <button
            onClick={fetchFAQs}
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
        <FAQTable
          faqs={faqs}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onTogglePublished={handleTogglePublished}
        />
      )}
    </div>
  );
}
