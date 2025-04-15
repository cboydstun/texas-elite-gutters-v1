"use client";

import { useState } from "react";
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

interface ReviewsTableProps {
  reviews: Review[];
  onUpdate: (id: string, updateData: Partial<Review>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const ReviewsTable = ({
  reviews,
  onUpdate,
  onDelete,
}: ReviewsTableProps) => {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Review>>({});

  const toggleExpand = (id: string) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  const startEdit = (review: Review) => {
    setEditMode(review._id.toString());
    setEditData({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      source: review.source,
    });
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditData({});
  };

  const handleUpdate = async (id: string) => {
    setIsLoading({ ...isLoading, [id]: true });
    try {
      await onUpdate(id, editData);
      setEditMode(null);
      setEditData({});
    } finally {
      setIsLoading({ ...isLoading, [id]: false });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setIsLoading({ ...isLoading, [id]: true });
      try {
        await onDelete(id);
      } finally {
        setIsLoading({ ...isLoading, [id]: false });
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const getSourceBadgeClass = (source: ReviewSource) => {
    switch (source) {
      case ReviewSource.GOOGLE:
        return "bg-green-100 text-green-800";
      case ReviewSource.YELP:
        return "bg-red-100 text-red-800";
      case ReviewSource.FACEBOOK:
        return "bg-blue-100 text-blue-800";
      case ReviewSource.INSTAGRAM:
        return "bg-purple-100 text-purple-800";
      case ReviewSource.YOUTUBE:
        return "bg-red-100 text-red-800";
      case ReviewSource.WEBSITE:
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No reviews found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rating
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Source
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews.map((review) => (
            <tr key={review._id.toString()}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {review.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {renderStars(review.rating)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSourceBadgeClass(
                    review.source
                  )}`}
                >
                  {review.source}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(review.createdAt.toString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleExpand(review._id.toString())}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  {expandedReview === review._id.toString() ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => handleDelete(review._id.toString())}
                  disabled={isLoading[review._id.toString()]}
                  className="text-red-600 hover:text-red-900"
                >
                  {isLoading[review._id.toString()] ? "..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expanded review details */}
      {expandedReview && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {reviews
            .filter((r) => r._id.toString() === expandedReview)
            .map((review) => (
              <div key={`expanded-${review._id}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Review from {review.name}
                  </h3>
                  <div className="flex space-x-2">
                    {editMode === review._id.toString() ? (
                      <>
                        <button
                          onClick={() => handleUpdate(review._id.toString())}
                          disabled={isLoading[review._id.toString()]}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          {isLoading[review._id.toString()]
                            ? "Saving..."
                            : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(review)}
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {editMode === review._id.toString() ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={editData.name || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rating"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Rating
                      </label>
                      <select
                        id="rating"
                        value={editData.rating || 5}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            rating: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="source"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Source
                      </label>
                      <select
                        id="source"
                        value={editData.source || ReviewSource.WEBSITE}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            source: e.target.value as ReviewSource,
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        {Object.values(ReviewSource).map((source) => (
                          <option key={source} value={source}>
                            {source}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        value={editData.comment || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, comment: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        via {review.source}
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {review.comment}
                      </p>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>
                        <strong>Submitted:</strong>{" "}
                        {formatDate(review.createdAt.toString())}
                      </p>
                      <p>
                        <strong>Last Updated:</strong>{" "}
                        {formatDate(review.updatedAt.toString())}
                      </p>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
