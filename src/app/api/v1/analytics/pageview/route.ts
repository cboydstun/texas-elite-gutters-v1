import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import { Thumbprint } from "@/lib/db/models/Thumbprint";

/**
 * API route for recording page views and interactions
 * POST /api/v1/analytics/pageview
 *
 * This endpoint is designed to be called with navigator.sendBeacon()
 * when the user leaves a page, to record visit duration and interactions
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.fingerprintHash || !data.page) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    await dbConnect();

    // Find the thumbprint record
    const thumbprint = await Thumbprint.findOne({
      fingerprintHash: data.fingerprintHash,
    });

    if (!thumbprint) {
      return NextResponse.json(
        { success: false, error: "Fingerprint not found" },
        { status: 404 },
      );
    }

    // Find the most recent visit for this page
    // We're looking for the most recent visit to this page without duration set
    const visitIndex = thumbprint.visits.findIndex(
      (visit: { page: string; duration?: number }) =>
        visit.page === data.page && !visit.duration,
    );

    if (visitIndex >= 0) {
      // Update the existing visit with duration and interaction data
      thumbprint.visits[visitIndex].duration = data.duration || 0;
      thumbprint.visits[visitIndex].exitPage = data.exitPage || data.page;

      // Add interaction data if provided
      if (data.interactions) {
        thumbprint.visits[visitIndex].interactions = {
          clicks: data.interactions.clicks || 0,
          scrollDepth: data.interactions.scrollDepth || 0,
          formInteractions: data.interactions.formInteractions || false,
        };
      }

      await thumbprint.save();

      return NextResponse.json({
        success: true,
        message: "Page view updated",
      });
    } else {
      // If we can't find a matching visit (unusual case), create a new one
      thumbprint.visits.push({
        timestamp: new Date(),
        page: data.page,
        duration: data.duration || 0,
        exitPage: data.exitPage || data.page,
        interactions: data.interactions
          ? {
              clicks: data.interactions.clicks || 0,
              scrollDepth: data.interactions.scrollDepth || 0,
              formInteractions: data.interactions.formInteractions || false,
            }
          : undefined,
      });

      await thumbprint.save();

      return NextResponse.json({
        success: true,
        message: "New page view recorded",
      });
    }
  } catch (error) {
    console.error("Error recording page view:", error);

    // For beacon requests, we still return 200 even on error
    // since the client won't be able to retry anyway
    return NextResponse.json(
      { success: false, error: "Failed to record page view" },
      { status: 200 },
    );
  }
}
