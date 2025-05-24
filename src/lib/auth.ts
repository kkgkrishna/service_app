import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export async function verifyToken(token: string) {
  try {
    // Verify token
    const decoded = verify(token, JWT_SECRET) as JWTPayload;

    // Return user data from token
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
