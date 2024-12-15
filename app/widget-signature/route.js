import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);
    const { paramsToSign } = body;

    // Add timestamp if not present
    const timestamp = Math.round(new Date().getTime() / 1000);
    const params = {
      timestamp: timestamp,
      ...paramsToSign,
    };

    console.log("Params to sign:", params);
    console.log(
      "API Secret:",
      process.env.CLOUDINARY_API_SECRET ? "Present" : "Missing"
    );
    console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET
    );

    console.log("Generated signature:", signature);

    return NextResponse.json({
      signature,
      timestamp,
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
