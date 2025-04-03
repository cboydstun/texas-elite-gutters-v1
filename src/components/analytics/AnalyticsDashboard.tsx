'use client';

import { useState } from 'react';
import { AnalyticsData } from '@/lib/analytics/data';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'pages'>('overview');

  return (
    <div>
      {/* Dashboard Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'overview'
              ? 'text-[#001F33] border-b-2 border-[#001F33]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'visitors'
              ? 'text-[#001F33] border-b-2 border-[#001F33]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('visitors')}
        >
          Visitors
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'pages'
              ? 'text-[#001F33] border-b-2 border-[#001F33]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('pages')}
        >
          Pages
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Visitors</h3>
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold">{data.visitorStats.totalVisitors}</p>
                <div className="text-sm text-gray-500">
                  <p>{data.visitorStats.newVisitors} new</p>
                  <p>{data.visitorStats.returningVisitors} returning</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Page Views</h3>
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold">{data.visitorStats.totalPageViews}</p>
                <div className="text-sm text-gray-500">
                  <p>{data.visitorStats.averagePageViewsPerVisit} per visit</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Avg. Visit Duration</h3>
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold">
                  {formatDuration(data.visitorStats.averageVisitDuration)}
                </p>
                <div className="text-sm text-gray-500">
                  <p>seconds per visit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Device Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DeviceCard
                type="Desktop"
                count={data.deviceBreakdown.desktop}
                total={data.visitorStats.totalVisitors}
                color="#4299E1"
              />
              <DeviceCard
                type="Tablet"
                count={data.deviceBreakdown.tablet}
                total={data.visitorStats.totalVisitors}
                color="#48BB78"
              />
              <DeviceCard
                type="Mobile"
                count={data.deviceBreakdown.mobile}
                total={data.visitorStats.totalVisitors}
                color="#F6AD55"
              />
              <DeviceCard
                type="Other"
                count={data.deviceBreakdown.other}
                total={data.visitorStats.totalVisitors}
                color="#A0AEC0"
              />
            </div>
          </div>

          {/* Visitor Activity Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Visitor Activity</h3>
            <div className="h-64">
              <VisitorActivityChart data={data.visitorActivity} />
            </div>
          </div>
        </div>
      )}

      {/* Visitors Tab */}
      {activeTab === 'visitors' && (
        <div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Visitors</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fingerprint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Seen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Page
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.recentVisitors.map((visitor, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                        {visitor.fingerprintHash.substring(0, 10)}...
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visitor.device}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(visitor.lastSeen)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visitor.visitCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {visitor.lastPage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Pages</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.topPages.map((page, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {page.page}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {page.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDuration(page.averageDuration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components

function DeviceCard({ type, count, total, color }: { type: string; count: number; total: number; color: string }) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{type}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <p className="mt-2 text-lg font-semibold">{count}</p>
    </div>
  );
}

function VisitorActivityChart({ data }: { data: AnalyticsData['visitorActivity'] }) {
  // Find the maximum values for scaling
  const maxVisitors = Math.max(...data.map(d => d.visitors));
  const maxPageViews = Math.max(...data.map(d => d.pageViews));
  const maxValue = Math.max(maxVisitors, maxPageViews);
  
  // Only show the last 14 days for better visibility
  const recentData = data.slice(-14);
  
  return (
    <div className="relative h-full">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500">
        <span>{maxValue}</span>
        <span>{Math.round(maxValue / 2)}</span>
        <span>0</span>
      </div>
      
      {/* Chart area */}
      <div className="absolute left-10 right-0 top-0 bottom-0 flex items-end">
        {recentData.map((day, index) => (
          <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
            {/* Visitors bar */}
            <div
              className="w-3 bg-[#001F33] rounded-t"
              style={{
                height: `${(day.visitors / maxValue) * 100}%`,
                marginRight: '2px'
              }}
            ></div>
            
            {/* Page views bar */}
            <div
              className="w-3 bg-[#C9A357] rounded-t"
              style={{
                height: `${(day.pageViews / maxValue) * 100}%`,
                marginLeft: '2px'
              }}
            ></div>
            
            {/* X-axis label */}
            <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
              {formatShortDate(day.date)}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="absolute right-0 top-0 flex items-center text-xs">
        <div className="flex items-center mr-4">
          <div className="w-3 h-3 bg-[#001F33] rounded mr-1"></div>
          <span>Visitors</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#C9A357] rounded mr-1"></div>
          <span>Page Views</span>
        </div>
      </div>
    </div>
  );
}

// Helper Functions

function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}m ${remainingSeconds}s`;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}
