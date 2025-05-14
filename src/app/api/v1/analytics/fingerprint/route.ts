import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import { Thumbprint } from "@/lib/db/models/Thumbprint";

/**
 * API route for storing fingerprint data
 * POST /api/v1/analytics/fingerprint
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.fingerprintHash || !data.components) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    await dbConnect();

    // Check if this fingerprint already exists
    const existingThumbprint = await Thumbprint.findOne({
      fingerprintHash: data.fingerprintHash,
    });

    if (existingThumbprint) {
      // Update existing record
      existingThumbprint.lastSeen = new Date();
      existingThumbprint.visitCount += 1;

      // Add new visit
      existingThumbprint.visits.push({
        timestamp: new Date(),
        page: data.page || "/",
        referrer: data.referrer || null,
      });

      // Update user agent if provided
      if (data.userAgent) {
        existingThumbprint.userAgent = data.userAgent;
      }

      // Update device info if provided
      if (data.device && data.device.type) {
        existingThumbprint.device = {
          ...existingThumbprint.device,
          ...data.device,
        };
      }

      await existingThumbprint.save();

      return NextResponse.json({
        success: true,
        isNewVisitor: false,
        fingerprintHash: data.fingerprintHash,
      });
    } else {
      // Create new record
      const newThumbprint = new Thumbprint({
        fingerprintHash: data.fingerprintHash,
        components: data.components,
        userAgent: data.userAgent || null,
        device: data.device || { type: "other" },
        visits: [
          {
            timestamp: new Date(),
            page: data.page || "/",
            referrer: data.referrer || null,
          },
        ],
      });

      await newThumbprint.save();

      return NextResponse.json({
        success: true,
        isNewVisitor: true,
        fingerprintHash: data.fingerprintHash,
      });
    }
  } catch (error) {
    console.error("Error processing fingerprint:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process fingerprint" },
      { status: 500 },
    );
  }
}
