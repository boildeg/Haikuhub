"use server";

import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

let haikuId;

const isAlphaNumeric = (string) => /^[a-zA-Z0-9 .,]*$/.test(string);

//SHARED HAIKU LOGIC
const sharedHaikuLogic = async function (
  formData,
  user,
  publicId,
  signature,
  version
) {
  const errors = {};

  console.log(publicId, signature, version);

  const ourHaiku = {
    line1: formData.get("line1"),
    line2: formData.get("line2"),
    line3: formData.get("line3"),
    author: ObjectId.createFromHexString(user.userId),
  };

  if (typeof ourHaiku.line1 !== "string") ourHaiku.line1 = "";
  if (typeof ourHaiku.line2 !== "string") ourHaiku.line2 = "";
  if (typeof ourHaiku.line3 !== "string") ourHaiku.line3 = "";

  ourHaiku.line1 = ourHaiku.line1.trim();
  ourHaiku.line2 = ourHaiku.line2.trim();
  ourHaiku.line3 = ourHaiku.line3.trim();

  ourHaiku.line1 = ourHaiku.line1.replace(/ +/g, " ");
  ourHaiku.line2 = ourHaiku.line2.replace(/ +/g, " ");
  ourHaiku.line3 = ourHaiku.line3.replace(/ +/g, " ");

  if (ourHaiku.line1.length === 0) errors.line1 = "Line 1 is required";
  if (ourHaiku.line2.length === 0) errors.line2 = "Line 2 is required";
  if (ourHaiku.line3.length === 0) errors.line3 = "Line 3 is required";

  if (ourHaiku.line1.length < 5) errors.line1 = "Line 1 is too short";
  if (ourHaiku.line2.length < 7) errors.line2 = "Line 2 is too short";
  if (ourHaiku.line3.length < 5) errors.line3 = "Line 3 is too short";

  if (ourHaiku.line1.length > 26) errors.line1 = "Line 1 is too long";
  if (ourHaiku.line2.length > 36) errors.line2 = "Line 2 is too long";
  if (ourHaiku.line3.length > 26) errors.line3 = "Line 3 is too long";

  if (!isAlphaNumeric(ourHaiku.line1))
    errors.line1 = "No special characters allowed";
  if (!isAlphaNumeric(ourHaiku.line2))
    errors.line2 = "No special characters allowed";
  if (!isAlphaNumeric(ourHaiku.line3))
    errors.line3 = "No special characters allowed";

  //verify signature

  const verified = cloudinary.utils.api_sign_request(
    {
      public_id: publicId,
      version: version,
    },
    process.env.CLOUDINARY_API_SECRET
  );

  if (verified === signature) {
    ourHaiku.photo = publicId;
  } else {
    errors.signature = "Signature verification failed";
  }

  return { errors, ourHaiku };
};

//CREATE HAIKU
export const createHaiku = async function (
  publicId,
  signature,
  version,
  prevState,
  formData
) {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const results = await sharedHaikuLogic(
    formData,
    user,
    publicId,
    signature,
    version
  );

  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors };
  }

  // save to db
  const haikusCollection = await getCollection("haikus");

  const newHaiku = await haikusCollection.insertOne(results.ourHaiku);

  return redirect("/");
};

//EDIT HAIKU
export const editHaiku = async function (haikuId, prevState, formData) {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const results = await sharedHaikuLogic(formData, user);

  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors };
  }

  const haikusCollection = await getCollection("haikus");

  const updatedHaiku = await haikusCollection.updateOne(
    { _id: ObjectId.createFromHexString(haikuId) },
    { $set: results.ourHaiku }
  );

  return redirect("/");
};

export const deleteHaiku = async function (formData) {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const haikuId = formData.get("haikuId");

  const haikusCollection = await getCollection("haikus");

  const deleteHaiku = await haikusCollection.deleteOne({
    _id: ObjectId.createFromHexString(haikuId),
  });

  return redirect("/");
};
