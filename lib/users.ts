"use server";

import { db } from "@/db/drizzle";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  const allUsers = await db.select().from(users);
  return allUsers;
}

export async function createUser(
  user: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  try {
    const newUser = await db.insert(users).values(user).returning();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function updateUser(
  id: string,
  user: Omit<User, "id" | "createdAt" | "updatedAt">
) {
  try {
    const updatedUser = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: string) {
  const deletedUser = await db.delete(users).where(eq(users.id, id));
  return deletedUser;
}
