"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUser() {
  // Wait for cookies() to resolve
  const cookieUserStore = await cookies();
  const userCookie = cookieUserStore.get("haiku_user")?.value;

  if (!userCookie) return null;

  try {
    const decoded = jwt.verify(userCookie, process.env.JWT_VALUE);

    return {
      userName: decoded.userName,
      userId: decoded.userId,
    };
  } catch (error) {
    console.error("Error decoding user token:", error);
    return null;
  }
}
