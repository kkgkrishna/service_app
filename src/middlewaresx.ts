// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// // Add paths that don't require authentication
// const publicPaths = [
//   "/login",
//   "/signup",
//   "/api/login",
//   "/api/signup",
//   "/dashboard",
// ];

// const apiPaths = ["/api"];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Get token from cookie
//   const token = request.cookies.get("token")?.value;
//   console.log(token);
//   // Check if the path is public or an API route
//   const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
//   const isApiPath = apiPaths.some((path) => pathname.startsWith(path));

//   // If path is public, allow access
//   if (isPublicPath) {
//     return NextResponse.next();
//   }

//   // For API routes that are not public, verify token
//   if (isApiPath) {
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     try {
//       verify(token, JWT_SECRET);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//     }
//   }

//   // If no token is present, redirect to login
//   if (!token) {
//     const loginUrl = new URL("/login", request.url);
//     // Only set the 'from' parameter if it's not a login-related path
//     if (!pathname.startsWith("/login")) {
//       loginUrl.searchParams.set("from", pathname);
//     }
//     return NextResponse.redirect(loginUrl);
//   }

//   try {
//     // Verify token
//     verify(token, JWT_SECRET);

//     // Token is valid, allow access to protected route
//     const response = NextResponse.next();

//     // Ensure the token cookie is properly set
//     response.cookies.set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     // If token is invalid, delete it and redirect to login
//     const loginUrl = new URL("/login", request.url);
//     if (!pathname.startsWith("/login")) {
//       loginUrl.searchParams.set("from", pathname);
//     }
//     const response = NextResponse.redirect(loginUrl);
//     response.cookies.delete("token");
//     return response;
//   }
// }

// // Configure paths that should be protected by the middleware
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * 1. /_next/* (Next.js internals)
//      * 2. /fonts/* (static font files)
//      * 3. /favicon.ico, /sitemap.xml (static files)
//      */
//     // "/((?!_next|fonts|favicon.ico|sitemap.xml).*)",
//   ],
// };
