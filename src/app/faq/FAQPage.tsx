"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
        // Only show published FAQs
        const publishedFaqs = data.faqs.filter((faq: FAQ) => faq.isPublished);
        
        // Sort by order and then by category
        publishedFaqs.sort((a: FAQ, b: FAQ) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return a.order - b.order;
        });
        
        setFaqs(publishedFaqs);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(publishedFaqs.map((faq: FAQ) => faq.category))
        );
        setCategories(uniqueCategories as string[]);
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

  // Fetch FAQs on component mount
  useEffect(() => {
    fetchFAQs();
  }, []);

  // Filter FAQs by selected category
  const filteredFaqs = selectedCategory
    ? faqs.filter((faq) => faq.category === selectedCategory)
    : faqs;

  // Group FAQs by category
  const faqsByCategory = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#001525] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our gutter installation, repair, and maintenance services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 max-w-4xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
          <div className="max-w-4xl mx-auto">
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === null
                        ? "bg-[#001525] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-[#001525] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No FAQs found.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
                  <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-[#001F33] px-6 py-4">
                      <h2 className="text-xl font-bold text-white">{category}</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {categoryFaqs.map((faq) => (
                        <details
                          key={faq._id.toString()}
                          className="group"
                        >
                          <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6">
                            <span className="text-gray-900">{faq.question}</span>
                            <span className="transition group-open:rotate-180">
                              <svg
                                fill="none"
                                height="24"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                              >
                                <path d="M6 9l6 6 6-6"></path>
                              </svg>
                            </span>
                          </summary>
                          <div className="px-6 pb-6 pt-0 text-gray-700 whitespace-pre-wrap">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-12 bg-[#001F33] rounded-lg shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-300 mb-6">
                We're here to help. Contact our team for personalized assistance.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#C9A357] text-white font-medium px-6 py-3 rounded-md hover:bg-[#B89347] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
