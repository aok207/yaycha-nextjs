"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function register(state: unknown, formData: FormData) {
  // 1. Validate fields
  const schema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    confirmPassword: z
      .string()
      .min(1)
      .refine(
        (value) => value === formData.get("password"),
        "Passwords do not match"
      ),
  });

  const validationResult = schema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. Find if user already exists
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: validationResult.data.email,
      },
    },
  });

  if (user) {
    return {
      errors: {
        username: undefined,
        email: "User already exists with the given email!",
        password: undefined,
        confirmPassword: undefined,
      },
    };
  }

  // 3. Find if username is taken
  const usernameTaken = await prisma.user.findFirst({
    where: {
      name: {
        equals: validationResult.data.username,
      },
    },
  });

  if (usernameTaken) {
    return {
      errors: {
        username: "Username is already taken",
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
      },
    };
  }

  // 3. create user
  const { username, email, password } = validationResult.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  // 4. Create Session
  await createSession({ id: data.id, name: data.name });
  redirect("/");
}
