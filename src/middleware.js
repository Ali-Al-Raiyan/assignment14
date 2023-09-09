import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req, res, next) {
  if (req.nextUrl.pathname.startsWith("/api/Profile")) {
    // Token Verify
    try {
      // Token Pick from Header
      const reqHeaders = new Headers(req.headers);
      const Token = reqHeaders.get("Token");

      // Token Verify
      const Key = new TextEncoder().encode(process.env.JWT_KEY);
      const decodedString = await jwtVerify(Token, Key);

      // Add with Next Request Header
      const username = decodedString["payload"]["useremail"];
      reqHeaders.set("useremail", useremail);

      // Next step with manupulated header
      return NextResponse.next({
        request: { headers: reqHeaders },
      });
    } catch (e) {
      return NextResponse.json(
        {
          status: "fail",
          massage: "Invalid User",
        },
        {
          status: 401,
        }
      );
    }
  }
}
