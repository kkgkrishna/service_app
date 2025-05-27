import { verify, sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function generateToken(user: {
  id: string;
  email: string;
  name: string;
  role: string;
}) {
  console.log("Generating token for user data:", {
    id: user?.id,
    email: user?.email,
    name: user?.name,
    role: user?.role,
  });

  if (!user || !user.id || !user.email || !user.name) {
    console.error("Invalid user data for token generation:", user);
    throw new Error("Invalid user data for token generation");
  }

  try {
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role || "USER",
    };

    console.log("Created JWT payload:", payload);
    const token = sign(payload, JWT_SECRET, { expiresIn: "1d" });
    console.log("Token generated successfully");
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
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
      role: decoded.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
