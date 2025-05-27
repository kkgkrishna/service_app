import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateToken } from "@/lib/auth";

// Validation schema for signup request
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request body - expected JSON" },
        { status: 400 }
      );
    }

    console.log("Received signup request:", {
      ...body,
      password: "[REDACTED]",
    });

    // Validate request body
    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      console.error("Validation error:", validation.error.errors);
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    try {
      // Test database connection
      console.log("Testing database connection...");
      await prisma.$connect();
      console.log("Database connection successful");

      // Check if user already exists
      console.log("Checking for existing user with email:", email);
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log("User already exists with email:", email);
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }

      // Hash password
      console.log("Hashing password...");
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      console.log("Creating new user...");
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "USER", // Set default role
        },
      });

      console.log("User created in database:", {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      // Remove password from response and prepare user data
      const { password: _, ...userWithoutPassword } = user;

      // Generate JWT token
      console.log("Preparing to generate token for user:", {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      try {
        const token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        });

        console.log("Token generated successfully");

        // Create the response with the token
        const response = NextResponse.json(
          {
            message: "User created successfully",
            user: userWithoutPassword,
          },
          { status: 201 }
        );

        // Set the token cookie
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 86400, // 1 day
        });

        return response;
      } catch (tokenError) {
        console.error("Failed to generate token:", tokenError);
        return NextResponse.json(
          { error: "Failed to generate authentication token" },
          { status: 500 }
        );
      }
    } catch (dbError) {
      console.error("Database error during user creation:", dbError);

      // Log the full error details
      console.error("Full error details:", {
        name: dbError.name,
        message: dbError.message,
        stack: dbError.stack,
        code: dbError.code,
      });

      // Check if it's a Prisma error and handle it appropriately
      if (dbError.code === "P2002") {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create user account", details: dbError.message },
        { status: 500 }
      );
    } finally {
      // Disconnect from the database
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error("Signup error:", error);
    console.error("Full error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
