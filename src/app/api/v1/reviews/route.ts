import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../auth";
import dbConnect from "@/lib/db/connect";
import { Review } from "@/lib/db/models/Review";
import { ReviewSource } from "@/lib/types/ReviewTypes";

// Review schema for validation
const reviewSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot be more than 5" }),
  comment: z.string().min(1, { message: "Comment is required" }),
  source: z.enum(
    [
      ReviewSource.GOOGLE,
      ReviewSource.YELP,
      ReviewSource.FACEBOOK,
      ReviewSource.INSTAGRAM,
      ReviewSource.WEBSITE,
      ReviewSource.YOUTUBE,
      ReviewSource.OTHER,
    ],
    { message: "Invalid review source" },
  ),
});

// Update review schema
const updateReviewSchema = z.object({
  id: z.string().min(1, { message: "Review ID is required" }),
  name: z.string().min(1, { message: "Name is required" }).optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating cannot be more than 5" })
    .optional(),
  comment: z.string().min(1, { message: "Comment is required" }).optional(),
  source: z
    .enum(
      [
        ReviewSource.GOOGLE,
        ReviewSource.YELP,
        ReviewSource.FACEBOOK,
        ReviewSource.INSTAGRAM,
        ReviewSource.WEBSITE,
        ReviewSource.YOUTUBE,
        ReviewSource.OTHER,
      ],
      { message: "Invalid review source" },
    )
    .optional(),
});

// GET /api/v1/reviews - Get all reviews or a specific review by ID
export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Check if an ID is provided in the query params
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Get a specific review by ID
      const review = await Review.findById(id);

      if (!review) {
        return NextResponse.json(
          { success: false, message: "Review not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          review,
        },
        { status: 200 },
      );
    } else {
      // Get all reviews
      const reviews = await Review.find({}).sort({ createdAt: -1 });

      return NextResponse.json(
        {
          success: true,
          reviews,
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.error("Get reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/v1/reviews - Create a new review (public)
export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await req.json();
    const validationResult = reviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const { name, rating, comment, source } = validationResult.data;

    // Create new review
    const review = await Review.create({
      name,
      rating,
      comment,
      source,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Review created successfully",
        review,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/v1/reviews - Update a review (private)
export async function PUT(req: NextRequest) {
  try {
    // Verify authentication using NextAuth
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await req.json();
    const validationResult = updateReviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const { id, ...updateData } = validationResult.data;

    // Update review
    const review = await Review.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Review updated successfully",
        review,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Update review error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/reviews - Delete a review (private)
export async function DELETE(req: NextRequest) {
  try {
    // Verify authentication using NextAuth
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // Connect to database
    await dbConnect();

    // Get review ID from query params
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 },
      );
    }

    // Delete review
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Review deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Delete review error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
