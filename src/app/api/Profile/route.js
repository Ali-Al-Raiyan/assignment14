import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req, res) {
  // Find User Identity By Checking Header
  const head = headers();
  let useremail = head.get("useremail");

  return NextResponse.json({ msg: useremail });
}
