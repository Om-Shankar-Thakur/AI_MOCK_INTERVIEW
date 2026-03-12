"use server";

import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie with user ID
async function setSessionCookie(userId: string) {
  const cookieStore = await cookies();

  cookieStore.set("session", userId, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { name, email, password } = params;

  try {
    const db = await getDb();
    const usersCollection = db.collection("users");

    // check if user exists in db
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    // save user to db
    await usersCollection.insertOne({
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, password } = params;

  try {
    const db = await getDb();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email, password });
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
      };
    }

    await setSessionCookie(user._id.toString());

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error: any) {
    console.error("Sign in error:", error);

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const db = await getDb();
    const { ObjectId } = await import("mongodb");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(sessionCookie),
    });
    if (!user) return null;

    return {
      name: user.name,
      email: user.email,
      id: user._id.toString(),
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
