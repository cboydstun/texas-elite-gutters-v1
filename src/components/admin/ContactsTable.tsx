"use client";

import { useState } from "react";
// Define a simplified Contact interface for the component
interface Contact {
  _id: {
    toString: () => string;
  };
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: {
    toString: () => string;
  };
  updatedAt: {
    toString: () => string;
  };
}

interface ContactsTableProps {
  contacts: Contact[];
  onStatusChange: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const ContactsTable = ({
  contacts,
  onStatusChange,
  onDelete,
}: ContactsTableProps) => {
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpandedContact(expandedContact === id ? null : id);
  };

  const handleStatusChange = async (id: string, status: string) => {
    setIsLoading({ ...isLoading, [id]: true });
    try {
      await onStatusChange(id, status);
    } finally {
      setIsLoading({ ...isLoading, [id]: false });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setIsLoading({ ...isLoading, [id]: true });
      try {
        await onDelete(id);
      } finally {
        setIsLoading({ ...isLoading, [id]: false });
      }
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No contacts found.</p>
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
              Contact Info
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
          {contacts.map((contact) => (
            <tr key={contact._id.toString()}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {contact.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{contact.email}</div>
                <div className="text-sm text-gray-500">{contact.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                    contact.status
                  )}`}
                >
                  {contact.status.charAt(0).toUpperCase() +
                    contact.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(contact.createdAt.toString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleExpand(contact._id.toString())}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  {expandedContact === contact._id.toString()
                    ? "Hide"
                    : "View"}
                </button>
                <button
                  onClick={() => handleDelete(contact._id.toString())}
                  disabled={isLoading[contact._id.toString()]}
                  className="text-red-600 hover:text-red-900"
                >
                  {isLoading[contact._id.toString()] ? "..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expanded contact details */}
      {expandedContact && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {contacts
            .filter((c) => c._id.toString() === expandedContact)
            .map((contact) => (
              <div key={`expanded-${contact._id}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Message from {contact.name}
                  </h3>
                  <div className="flex space-x-2">
                    <select
                      value={contact.status}
                      onChange={(e) =>
                        handleStatusChange(
                          contact._id.toString(),
                          e.target.value
                        )
                      }
                      disabled={isLoading[contact._id.toString()]}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {contact.phone}
                  </p>
                  <p>
                    <strong>Submitted:</strong>{" "}
                    {formatDate(contact.createdAt.toString())}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
