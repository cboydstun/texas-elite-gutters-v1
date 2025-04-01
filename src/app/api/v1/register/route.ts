import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/db/connect";
import { User } from "@/lib/db/models/User";

// Password validation schema
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/^(?=.*[A-Z])(?=.*\d)/, {
    message: "Password must contain at least 1 uppercase letter and 1 number",
  });

// Registration schema
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: passwordSchema,
});

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse and validate request body
    const body = await req.json();
    const validationResult = registerSchema.safeParse(body);

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

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 },
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      isAdmin: true, // All users are admins as per requirements
    });

    await user.save();

    // Return success response (without password)
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
