"use client";

import { useState, useEffect } from "react";
import { ContactsTable } from "@/components/admin/ContactsTable";
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

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts
  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/contacts");

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      } else {
        throw new Error(data.message || "Failed to fetch contacts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching contacts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update contact status
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/v1/contacts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      const data = await response.json();
      if (data.success) {
        // Update the contact in the local state
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id.toString() === id
              ? { ...contact, status }
              : contact
          )
        );
      } else {
        throw new Error(data.message || "Failed to update contact");
      }
    } catch (err) {
      console.error("Error updating contact:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the contact"
      );
    }
  };

  // Delete contact
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/contacts?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      const data = await response.json();
      if (data.success) {
        // Remove the contact from the local state
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id.toString() !== id)
        );
      } else {
        throw new Error(data.message || "Failed to delete contact");
      }
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the contact"
      );
    }
  };

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
        <button
          onClick={fetchContacts}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? "Loading..." : "Refresh"}
        </button>
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
        <ContactsTable
          contacts={contacts}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
