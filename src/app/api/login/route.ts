import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Generate a proper hash for "password123" using bcrypt.hashSync
const hashedPassword =
  "$2a$10$3QxDjD1ylZcpCGUy3qGqUe6SmqhPk5QdU85amxqP/7JqGa/K1Cdba";

// Temporary user for testing
const DEMO_USER = {
  id: "1",
  email: "admin@example.com",
  name: "Admin User",
  password: hashedPassword,
};

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // For demo purposes, only check against the demo user
    if (email !== DEMO_USER.email) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, DEMO_USER.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      {
        userId: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
