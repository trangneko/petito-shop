import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export default async function middleWare(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization")

    if (authHeader == null) return false;

    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  
    return username === process.env.ADMIN_USERNAME && (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string))
}

export const config = {
  matcher: "/admin/:path",
};

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
//   const isApiAuthRouter = req.nextUrl.pathname.startsWith("/api/auth");

//   if (isApiAuthRouter) {
//     return;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL("/", req.nextUrl));
//     }
//     return;
//   }
//   if (!isLoggedIn && !isAuthRoute) {
//     return Response.redirect(new URL("/auth/login", req.nextUrl));
//   }

//   return;
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };