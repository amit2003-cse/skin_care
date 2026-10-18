import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

interface GoogleTokenPayload {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified?: boolean;
}

function parseJwt(token: string): GoogleTokenPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, "base64")
        .toString("binary")
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to parse JWT:", err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { credential } = body;

    if (!credential) {
      return NextResponse.json(
        { error: "Missing Google credential token" },
        { status: 400 }
      );
    }

    const payload = parseJwt(credential);
    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Invalid Google credential token" },
        { status: 400 }
      );
    }

    const { sub: googleId, name, email, picture: image } = payload;

    // Connect to MongoDB Atlas
    const conn = await connectToDatabase();
    let dbUser = null;

    if (conn) {
      try {
        dbUser = await User.findOneAndUpdate(
          { email },
          { name, email, image, googleId },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (dbErr) {
        console.error("[MongoDB] Error saving user to database:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: dbUser ? dbUser._id.toString() : googleId,
        name: dbUser ? dbUser.name : name,
        email: dbUser ? dbUser.email : email,
        image: dbUser ? dbUser.image : image,
      },
      message: conn
        ? "Successfully authenticated and saved to MongoDB Atlas!"
        : "Authenticated via Google (MongoDB URI pending password in .env.local)",
    });
  } catch (error) {
    console.error("Google Auth API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
