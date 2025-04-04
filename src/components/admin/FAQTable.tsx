"use client";

import { useState } from "react";

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

interface FAQTableProps {
  faqs: FAQ[];
  onUpdate: (id: string, updateData: Partial<FAQ>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onTogglePublished: (id: string, isPublished: boolean) => Promise<void>;
}

export const FAQTable = ({
  faqs,
  onUpdate,
  onDelete,
  onTogglePublished,
}: FAQTableProps) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<FAQ>>({});

  const toggleExpand = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const startEdit = (faq: FAQ) => {
    setEditMode(faq._id.toString());
    setEditData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
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
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setIsLoading({ ...isLoading, [id]: true });
      try {
        await onDelete(id);
      } finally {
        setIsLoading({ ...isLoading, [id]: false });
      }
    }
  };

  const handleTogglePublished = async (id: string, isPublished: boolean) => {
    setIsLoading({ ...isLoading, [id]: true });
    try {
      await onTogglePublished(id, !isPublished);
    } finally {
      setIsLoading({ ...isLoading, [id]: false });
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

  const getCategoryBadgeClass = (category: string) => {
    // Generate a consistent color based on the category name
    const hash = category.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-yellow-100 text-yellow-800",
      "bg-red-100 text-red-800",
      "bg-indigo-100 text-indigo-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  if (faqs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No FAQs found.</p>
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
              Question
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
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
          {faqs.map((faq) => (
            <tr key={faq._id.toString()}>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                  {faq.question}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeClass(
                    faq.category
                  )}`}
                >
                  {faq.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {faq.order}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleTogglePublished(faq._id.toString(), faq.isPublished)}
                  disabled={isLoading[faq._id.toString()]}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    faq.isPublished
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {faq.isPublished ? "Published" : "Draft"}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleExpand(faq._id.toString())}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  {expandedFAQ === faq._id.toString() ? "Hide" : "View"}
                </button>
                <button
                  onClick={() => handleDelete(faq._id.toString())}
                  disabled={isLoading[faq._id.toString()]}
                  className="text-red-600 hover:text-red-900"
                >
                  {isLoading[faq._id.toString()] ? "..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expanded FAQ details */}
      {expandedFAQ && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {faqs
            .filter((f) => f._id.toString() === expandedFAQ)
            .map((faq) => (
              <div key={`expanded-${faq._id}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    FAQ Details
                  </h3>
                  <div className="flex space-x-2">
                    {editMode === faq._id.toString() ? (
                      <>
                        <button
                          onClick={() => handleUpdate(faq._id.toString())}
                          disabled={isLoading[faq._id.toString()]}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          {isLoading[faq._id.toString()]
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
                        onClick={() => startEdit(faq)}
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {editMode === faq._id.toString() ? (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Question
                      </label>
                      <input
                        type="text"
                        id="question"
                        value={editData.question || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, question: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        value={editData.category || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="order"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Display Order
                      </label>
                      <input
                        type="number"
                        id="order"
                        value={editData.order || 0}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            order: parseInt(e.target.value),
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="answer"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Answer
                      </label>
                      <textarea
                        id="answer"
                        rows={6}
                        value={editData.answer || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, answer: e.target.value })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <h4 className="text-md font-medium text-gray-700">Question:</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                        <p className="text-gray-700">{faq.question}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-md font-medium text-gray-700">Answer:</h4>
                      <div className="bg-white p-4 rounded-lg border border-gray-200 mt-2">
                        <p className="text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Category:</h4>
                        <span
                          className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBadgeClass(
                            faq.category
                          )}`}
                        >
                          {faq.category}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Display Order:</h4>
                        <p className="text-gray-600">{faq.order}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      <p>
                        <strong>Created:</strong>{" "}
                        {formatDate(faq.createdAt.toString())}
                      </p>
                      <p>
                        <strong>Last Updated:</strong>{" "}
                        {formatDate(faq.updatedAt.toString())}
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
