"use server";

import prisma from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();
}

export async function login(state: unknown, data: FormData) {
  // 1. Validate fields
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const validationResult = schema.safeParse({
    email: data.get("email")!,
    password: data.get("password")!,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. Find if user actually exists
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: validationResult.data.email,
      },
    },
  });

  if (!user) {
    return {
      errors: {
        email: "Incorrect email or Password!",
        password: undefined,
      },
    };
  }

  const checkPassword = await bcrypt.compare(
    validationResult.data.password,
    user.password
  );

  if (!checkPassword) {
    return {
      errors: {
        email: "Incorrect email or Password!",
        password: undefined,
      },
    };
  }

  await createSession({ id: user.id, name: user.name });

  redirect("/");
}
