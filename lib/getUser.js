"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getCollection } from "./db";

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("haiku_user");

  if (!token) return null;

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_VALUE);

    // Get session from database
    const sessionCollection = await getCollection("sessions");
    const session = await sessionCollection.findOne({
      sessionId: decoded.sessionId,
      expiresAt: { $gt: new Date() }, // Only return if session hasn't expired
    });

    if (!session) {
      return null;
    }

    return {
      userId: session.userId,
      username: session.username,
    };
  } catch (error) {
    return null;
  }
}
