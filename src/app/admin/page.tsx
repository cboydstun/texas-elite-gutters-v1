import { Metadata } from "next";
import Link from "next/link";
import dbConnect from "@/lib/db/connect";
import { Contact } from "@/lib/db/models/Contact";

export const metadata: Metadata = {
  title: "Admin Dashboard | Texas Elite Gutters & Exteriors",
  description: "Admin dashboard for Texas Elite Gutters & Exteriors",
};

export default async function AdminDashboard() {
  // Get current date for the dashboard
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Connect to database and get contact data
  await dbConnect();
  const contactCount = await Contact.countDocuments({});
  
  // Get the 3 most recent contacts
  const recentContacts = await Contact.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">{currentDate}</p>
        </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/contacts" className="block">
              <div className="bg-[#F8F9FA] p-4 rounded-lg border-l-4 border-[#C9A357] hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold mb-1">Total Inquiries</h3>
                <p className="text-3xl font-bold">{contactCount}</p>
                <p className="text-sm text-gray-500 mt-2">
                  From contact form submissions
                </p>
              </div>
            </Link>

            <div className="bg-[#F8F9FA] p-4 rounded-lg border-l-4 border-[#001F33]">
              <h3 className="text-lg font-semibold mb-1">Quote Requests</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-gray-500 mt-2">
                From quote request form
              </p>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold mb-1">Admin Users</h3>
              <p className="text-3xl font-bold">1</p>
              <p className="text-sm text-gray-500 mt-2">
                Active administrators
              </p>
            </div>
          </div>

          {/* Main content sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F33] p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Website Statistics</h3>
              </div>
              <p className="text-gray-600 mb-4">
                View website traffic and user engagement metrics.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-4">
                <li>• Page views tracking</li>
                <li>• Visitor demographics</li>
                <li>• Traffic sources</li>
              </ul>
              <Link
                href="/admin/analytics"
                className="text-[#C9A357] hover:text-[#B08A3E] font-medium text-sm"
              >
                View analytics →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F33] p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Content Management</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Update website content, images, and information.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-4">
                <li>• Edit page content</li>
                <li>• Manage service offerings</li>
                <li>• Update images and media</li>
              </ul>
              <Link
                href="#"
                className="text-[#C9A357] hover:text-[#B08A3E] font-medium text-sm"
              >
                Coming soon →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-[#001F33] p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">User Management</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Manage admin accounts and permissions.
              </p>
              <ul className="text-sm text-gray-500 space-y-2 mb-4">
                <li>• Add new administrators</li>
                <li>• Manage user roles</li>
                <li>• Reset passwords</li>
              </ul>
              <Link
                href="/register"
                className="text-[#C9A357] hover:text-[#B08A3E] font-medium text-sm"
              >
                Add new admin →
              </Link>
            </div>
          </div>

          {/* Recent contacts section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Inquiries</h3>
              <Link
                href="/admin/contacts"
                className="text-[#C9A357] hover:text-[#B08A3E] font-medium text-sm"
              >
                View all →
              </Link>
            </div>
            <div className="border-t border-gray-200">
              {recentContacts.length > 0 ? (
                recentContacts.map((contact: any) => (
                  <div
                    key={contact._id?.toString()}
                    className="py-4 border-b border-gray-100 flex items-start"
                  >
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">
                        {contact.email} • {contact.phone}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(contact.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  No contact submissions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

  );
}
