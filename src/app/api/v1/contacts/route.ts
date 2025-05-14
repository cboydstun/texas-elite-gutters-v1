import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../auth";
import dbConnect from "@/lib/db/connect";
import { Contact } from "@/lib/db/models/Contact";
import nodemailer from "nodemailer";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

// Update contact schema
const updateContactSchema = z.object({
  id: z.string().min(1, { message: "Contact ID is required" }),
  status: z.enum(["new", "contacted", "resolved", "archived"]),
});

// Create a nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// POST /api/v1/contacts - Create a new contact (public)
export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await req.json();
    const validationResult = contactFormSchema.safeParse(body);

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

    const { name, email, phone, message } = validationResult.data;

    // Create new contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      status: "new",
    });

    // Send email notification
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "texaselitegutter@gmail.com",
        subject: "Texas Elite Gutter Contact Form Submission",
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Continue even if email fails
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Contact created successfully",
        contact,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Contact creation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET /api/v1/contacts - Get all contacts (private)
export async function GET(req: NextRequest) {
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

    // Get all contacts
    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        contacts,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Get contacts error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/v1/contacts - Update a contact (private)
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
    const validationResult = updateContactSchema.safeParse(body);

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

    const { id, status } = validationResult.data;

    // Update contact
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Contact updated successfully",
        contact,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Update contact error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/v1/contacts - Delete a contact (private)
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

    // Get contact ID from query params
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID is required" },
        { status: 400 },
      );
    }

    // Delete contact
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Contact not found" },
        { status: 404 },
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Contact deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Delete contact error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
