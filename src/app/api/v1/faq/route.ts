import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../auth";
import dbConnect from "@/lib/db/connect";
import { FAQ } from "@/lib/db/models/FAQ";

// FAQ schema for validation
const faqSchema = z.object({
  question: z.string().min(1, { message: "Question is required" }),
  answer: z.string().min(1, { message: "Answer is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

// Update FAQ schema
const updateFAQSchema = z.object({
  id: z.string().min(1, { message: "FAQ ID is required" }),
  question: z.string().min(1, { message: "Question is required" }).optional(),
  answer: z.string().min(1, { message: "Answer is required" }).optional(),
  category: z.string().min(1, { message: "Category is required" }).optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

// GET /api/v1/faq - Get all FAQs or a specific FAQ by ID
export async function GET(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Check if an ID is provided in the query params
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");

    if (id) {
      // Get a specific FAQ by ID
      const faq = await (FAQ.findById(id) as any).exec();

      if (!faq) {
        return NextResponse.json(
          { success: false, message: "FAQ not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          success: true,
          faq,
        },
        { status: 200 },
      );
    } else if (category) {
      // Get FAQs by category
      const faqs = await (
        FAQ.find({
          category,
          isPublished: true,
        }) as any
      )
        .sort({ order: 1, createdAt: -1 })
        .exec();

      return NextResponse.json(
        {
          success: true,
          faqs,
        },
        { status: 200 },
      );
    } else {
      // Get all FAQs
      const faqs = await (
        FAQ.find({
          isPublished: true,
        }) as any
      )
        .sort({ order: 1, category: 1, createdAt: -1 })
        .exec();

      return NextResponse.json(
        {
          success: true,
          faqs,
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    console.error("Get FAQs error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/v1/faq - Create a new FAQ (private)
export async function POST(req: NextRequest) {
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
    const validationResult = faqSchema.safeParse(body);

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

    const {
      question,
      answer,
      category,
      order = 0,
      isPublished = true,
    } = validationResult.data;

    // Create new FAQ
    const faq = await FAQ.create({
      question,
      answer,
      category,
      order,
      isPublished,
    } as any);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "FAQ created successfully",
        faq,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("FAQ creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/v1/faq - Update a FAQ (private)
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
    const validationResult = updateFAQSchema.safeParse(body);

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

    // Update FAQ
    const faq = await (
      FAQ.findByIdAndUpdate(id, updateData, { new: true }) as any
    ).exec();

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "FAQ updated successfully",
        faq,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Update FAQ error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/faq - Delete a FAQ (private)
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

    // Get FAQ ID from query params
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "FAQ ID is required" },
        { status: 400 },
      );
    }

    // Delete FAQ
    const faq = await (FAQ.findByIdAndDelete(id) as any).exec();

    if (!faq) {
      return NextResponse.json(
        { success: false, message: "FAQ not found" },
        { status: 404 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "FAQ deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Delete FAQ error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
