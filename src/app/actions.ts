/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/db";
import { decrypt, getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export async function createPostAction(state: any, formData: FormData) {
  const session = cookies().get("session");

  if (!session) return { errors: { content: "You are not logged in!" } };

  // 1. Validate input
  const schema = z.object({
    content: z.string().min(1),
  });

  const validationResult = schema.safeParse({
    content: formData.get("content")!,
  });

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }
  // 2. Create a new post in the database
  await prisma.post.create({
    data: {
      content: validationResult.data.content,
      author: { connect: { id: (await decrypt(session.value))?.user.id } },
    },
  });
  // 3. Refresh the post list
  revalidatePath("/");
  // revalidatePath("/my-posts")

  return { errors: { content: undefined } };
}

export async function editPostAction(prevState: any, formData: FormData) {
  const session = await getSession();

  if (!session) return { errors: { content: "You are not logged in!" } };

  // 1. Validate input
  const schema = z.object({
    id: z.string().min(1),
    content: z.string().min(1),
  });

  const validationResult = schema.safeParse({
    id: formData.get("id"),
    content: formData.get("content")!,
  });

  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }

  // 2. Get the post from the database
  const { id, content } = validationResult.data;

  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    return {
      errors: {
        id: undefined,
        content: "Post not found!",
      },
    };
  }

  if (post.authorId !== session.user.id) {
    return {
      errors: {
        id: undefined,
        content: "You are not authorized to edit this post!",
      },
    };
  }

  // 3. Update the post in the database
  await prisma.post.update({
    where: { id },
    data: { content },
  });

  revalidatePath("/");
  // revalidatePath("/my-posts")

  return { errors: { content: undefined } };
}

export async function deletePost(prevState: any, formData: FormData) {
  const currentUser = await getSession();

  if (!currentUser) {
    return { error: "You are not logged in!" };
  }

  const postId = formData.get("id");

  if (!postId) {
    return { error: "Must provide a post to delete!" };
  }

  const post = await prisma.post.findFirst({
    where: { id: postId as string },
  });

  if (post?.authorId !== currentUser.user.id) {
    return { error: "You are not allowed to delete this post!" };
  }

  await prisma.post.delete({ where: { id: post?.id } });

  revalidatePath("/");
  // revalidatePath("/my-posts")

  return { error: undefined };
}

// This function will like the post if the user hasn't like it yet
// And unlike if the user has already liked
export async function likePostAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    return {
      error: "You are not logged in!",
    };
  }

  const postId = formData.get("postId") as string | null;

  if (!postId) {
    return {
      error: "Please provide a post!",
    };
  }

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return {
      error: "Post doesn't exist!",
    };
  }

  const likePost = await prisma.likePost.findFirst({
    where: {
      AND: {
        postId,
        userId: session.user.id,
      },
    },
  });

  try {
    // Like the post
    if (likePost === null) {
      const [] = await Promise.all([
        prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            likeCount: {
              increment: 1, // increment the like count by one
            },
          },
        }),
        prisma.likePost.create({
          data: {
            post: {
              connect: {
                id: post.id,
              },
            },
            user: {
              connect: {
                id: session.user.id,
              },
            },
          },
        }),
      ]);
    } else {
      const [] = await Promise.all([
        prisma.likePost.delete({
          where: {
            id: likePost.id,
          },
        }),
        prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            likeCount: {
              decrement: 1, // decrement the like count
            },
          },
        }),
      ]);
    }

    revalidatePath("/");
    // revalidatePath("/my-posts")

    return {
      error: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "There was an error. Please try again later!",
    };
  }
}
