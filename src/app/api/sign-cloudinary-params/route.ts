import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json(
        { error: "Missing paramsToSign" },
        { status: 400 }
      );
    }

    if (!process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary API secret not configured" },
        { status: 500 }
      );
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error signing Cloudinary params:', error);
    return NextResponse.json(
      { error: "Failed to sign parameters" },
      { status: 500 }
    );
  }
}