import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const JSONBody = await req.json();

  let useremail = JSONBody["useremail"];
  let password = JSONBody["password"];

  // DataBase Check
  if (useremail === "abc@abc.com" && password === "123") {
    const payload = { useremail: useremail };
    const Key = new TextEncoder().encode(process.env.JWT_KEY);

    let token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("https://localhost:3000")
      .setExpirationTime("2h")
      .sign(Key);

    return NextResponse.json(
      {
        status: "Success",
        massage: "Login Success",
        loken: token,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        status: "Fail",
        massage: "Invalid user",
      },
      {
        status: 401,
      }
    );
  }
}
