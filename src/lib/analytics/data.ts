import dbConnect from "@/lib/db/connect";
import { Thumbprint, IThumbprint } from "@/lib/db/models/Thumbprint";

/**
 * Interface for analytics data
 */
export interface AnalyticsData {
  visitorStats: {
    totalVisitors: number;
    newVisitors: number;
    returningVisitors: number;
    averageVisitDuration: number;
    totalPageViews: number;
    averagePageViewsPerVisit: number;
  };
  deviceBreakdown: {
    desktop: number;
    tablet: number;
    mobile: number;
    other: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    averageDuration: number;
  }>;
  visitorActivity: Array<{
    date: string;
    visitors: number;
    pageViews: number;
  }>;
  recentVisitors: Array<{
    fingerprintHash: string;
    device: string;
    lastSeen: Date;
    visitCount: number;
    lastPage: string;
  }>;
}

/**
 * Get analytics data for the dashboard
 */
export async function getAnalyticsData(
  dateRange: { start?: Date; end?: Date } = {}
): Promise<AnalyticsData> {
  await dbConnect();

  // Set default date range if not provided
  const end = dateRange.end || new Date();
  const start = dateRange.start || new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

  // Get all thumbprints
  const thumbprints = await Thumbprint.find({
    lastSeen: { $gte: start, $lte: end }
  });

  // Calculate visitor stats
  const totalVisitors = thumbprints.length;
  const newVisitors = thumbprints.filter(t => 
    t.firstSeen >= start && t.firstSeen <= end
  ).length;
  const returningVisitors = totalVisitors - newVisitors;

  // Calculate visit durations and page views
  let totalDuration = 0;
  let totalPageViews = 0;
  const pageViewsMap = new Map<string, { views: number; totalDuration: number }>();

  thumbprints.forEach(thumbprint => {
    // Filter visits within date range
    const visitsInRange = thumbprint.visits.filter((visit: { 
      timestamp: Date;
      duration?: number;
      page?: string;
    }) => 
      visit.timestamp >= start && visit.timestamp <= end
    );
    
    totalPageViews += visitsInRange.length;
    
    // Calculate total duration
    visitsInRange.forEach((visit: { 
      timestamp: Date;
      duration?: number;
      page?: string;
    }) => {
      if (visit.duration) {
        totalDuration += visit.duration;
      }
      
      // Track page views
      const page = visit.page || "/";
      if (!pageViewsMap.has(page)) {
        pageViewsMap.set(page, { views: 0, totalDuration: 0 });
      }
      
      const pageData = pageViewsMap.get(page)!;
      pageData.views += 1;
      if (visit.duration) {
        pageData.totalDuration += visit.duration;
      }
    });
  });

  // Calculate averages
  const averageVisitDuration = totalVisitors > 0 
    ? Math.round(totalDuration / totalVisitors) 
    : 0;
  
  const averagePageViewsPerVisit = totalVisitors > 0 
    ? Math.round((totalPageViews / totalVisitors) * 10) / 10 
    : 0;

  // Calculate device breakdown
  const deviceBreakdown = {
    desktop: 0,
    tablet: 0,
    mobile: 0,
    other: 0
  };

  thumbprints.forEach(thumbprint => {
    const deviceType = thumbprint.device?.type || "other";
    if (deviceType in deviceBreakdown) {
      deviceBreakdown[deviceType as keyof typeof deviceBreakdown] += 1;
    } else {
      deviceBreakdown.other += 1;
    }
  });

  // Get top pages
  const topPages = Array.from(pageViewsMap.entries())
    .map(([page, data]) => ({
      page,
      views: data.views,
      averageDuration: data.views > 0 ? Math.round(data.totalDuration / data.views) : 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Calculate visitor activity by day
  const activityMap = new Map<string, { visitors: Set<string>; pageViews: number }>();
  
  // Initialize the map with dates for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(end.getTime() - i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split("T")[0];
    activityMap.set(dateString, { visitors: new Set(), pageViews: 0 });
  }
  
  // Fill in the data
  thumbprints.forEach(thumbprint => {
    thumbprint.visits.forEach((visit: { 
      timestamp: Date;
      page?: string;
    }) => {
      if (visit.timestamp >= start && visit.timestamp <= end) {
        const dateString = visit.timestamp.toISOString().split("T")[0];
        
        if (!activityMap.has(dateString)) {
          activityMap.set(dateString, { visitors: new Set(), pageViews: 0 });
        }
        
        const dayData = activityMap.get(dateString)!;
        dayData.visitors.add(thumbprint.fingerprintHash);
        dayData.pageViews += 1;
      }
    });
  });
  
  // Convert to array and sort by date
  const visitorActivity = Array.from(activityMap.entries())
    .map(([date, data]) => ({
      date,
      visitors: data.visitors.size,
      pageViews: data.pageViews
    }))
    .sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date));

  // Get recent visitors
  const recentVisitors = thumbprints
    .sort((a: IThumbprint, b: IThumbprint) => b.lastSeen.getTime() - a.lastSeen.getTime())
    .slice(0, 10)
    .map(thumbprint => {
      // Find the most recent visit
      const lastVisit = thumbprint.visits
        .sort((a: { timestamp: Date }, b: { timestamp: Date }) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )[0];
      
      return {
        fingerprintHash: thumbprint.fingerprintHash,
        device: thumbprint.device?.type || "unknown",
        lastSeen: thumbprint.lastSeen,
        visitCount: thumbprint.visitCount,
        lastPage: lastVisit?.page || "/"
      };
    });

  return {
    visitorStats: {
      totalVisitors,
      newVisitors,
      returningVisitors,
      averageVisitDuration,
      totalPageViews,
      averagePageViewsPerVisit
    },
    deviceBreakdown,
    topPages,
    visitorActivity,
    recentVisitors
  };
}
