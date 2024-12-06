"use server";

import { getCollection } from "../lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphaNumeric(str) {
  const regex = /^[a-z0-9A-Z]+$/i;
  return regex.test(str);
}

export const loginUser = async function (prevState, formData) {
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // validate the form data

  if (typeof ourUser.username !== "string") errors.username = "";
  if (typeof ourUser.password !== "string") errors.password = "";

  const userCollection = await getCollection("users");
  const user = await userCollection.findOne({
    username: ourUser.username,
  });

  if (!user) {
    return {
      errors: {
        username: "Username or password is incorrect",
      },
      success: false,
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    ourUser.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return {
      errors: {
        username: "Username or password is incorrect",
      },
    };
  }

  // jwt value

  const jwtValue = jwt.sign(
    {
      userName: user.username,
      userId: user._id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // expires in 24 hours
    },
    process.env.JWT_VALUE
  );

  const cookieStore = await cookies();

  cookieStore.set("haiku_user", jwtValue, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return redirect("/");
};

export const logoutUser = async function () {
  const cookieStore = await cookies();
  cookieStore.delete("haiku_user");
  redirect("/");
};

export const registerUser = async function (prevState, formData) {
  const errors = {};

  // get the form data

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  // validate the form data

  if (typeof ourUser.username !== "string") errors.username = "";
  if (typeof ourUser.password !== "string") errors.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (ourUser.username.length < 3)
    errors.username = "Username must be at least 3 characters long";

  if (ourUser.username.length > 30)
    errors.username = "Username must be at most 30 characters long";

  if (!isAlphaNumeric(ourUser.username))
    errors.username = "Username must contain only letters and numbers";

  if (ourUser.username === "") errors.username = "Username cannot be empty";

  // check if the username already exists

  const usersCollection = await getCollection("users");
  const user = await usersCollection.findOne({
    username: ourUser.username,
  });

  if (user) {
    return {
      errors: {
        username: "Username already exists",
      },
      success: false,
    };
  }

  if (ourUser.password.length < 12)
    errors.password = "Password must be at least 12 characters long";

  if (ourUser.password.length > 50)
    errors.password = "Password must be at most 50 characters long";

  if (ourUser.password === "") errors.password = "Password cannot be empty";

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  // hash the password

  const salt = await bcrypt.genSalt(10);
  ourUser.password = await bcrypt.hashSync(ourUser.password, salt);

  // store the user in the database

  const ourUserFromDb = await usersCollection.insertOne(ourUser);

  // get the user from the database
  const userFromDb = await usersCollection.findOne({
    _id: ourUserFromDb.insertedId,
  });

  const ourUserId = userFromDb._id.toString();
  const ourUserName = userFromDb.username;

  // jwt value

  const jwtValue = jwt.sign(
    {
      userName: ourUserName,
      userId: ourUserId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // expires in 24 hours
    },
    process.env.JWT_VALUE
  );

  //log the user by giving them a cookie

  const cookieStore = await cookies();

  cookieStore.set("haiku_user", jwtValue, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    sameSite: "strict",
  });

  return redirect("/");
};
