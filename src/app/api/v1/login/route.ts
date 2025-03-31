import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db/connect";
import { User } from "@/lib/db/models/User";
import { rateLimit } from "@/lib/auth/rateLimit";

// Login schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Apply rate limiting
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  limit: 5, // 5 requests per minute
});

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting based on IP
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    await limiter.check(ip);

    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await req.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.AUTH_SECRET!,
      { expiresIn: "7d" }
    );

    // Return success response with token
    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error: unknown) {
    // Handle rate limit errors
    if (error instanceof Error && error.message === "Rate limit exceeded") {
      return NextResponse.json(
        { success: false, message: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
