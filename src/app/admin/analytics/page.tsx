import { Metadata } from "next";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { getAnalyticsData } from "@/lib/analytics/data";

export const metadata: Metadata = {
  title: "Analytics Dashboard | Texas Elite Gutters & Exteriors",
  description: "Website analytics and visitor tracking",
};

export default async function AnalyticsPage() {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Get analytics data
  const analyticsData = await getAnalyticsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-gray-500">
                Visitor insights and website performance
              </p>
            </div>
          </div>

          <AnalyticsDashboard data={analyticsData} />
        </div>
      </div>
    </div>
  );
}
