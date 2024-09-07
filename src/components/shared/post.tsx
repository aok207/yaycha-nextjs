import { Heart } from "lucide-react";
import React from "react";
import { formatDistance } from "date-fns";
import DeletePostForm from "../forms/delete-post-form";
import EditPostForm from "../forms/edit-post-form";
import prisma from "@/lib/db";
import { likePostAction } from "@/app/actions";

type PostType = {
  author: {
    name: string;
  };
} & {
  id: string;
  content: string;
  authorId: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
};

const Post = async ({
  post,
  loggedInUserId,
}: {
  post: PostType;
  loggedInUserId: string;
}) => {
  const userLikePost = await prisma.likePost.findFirst({
    where: {
      AND: {
        postId: post.id,
        userId: loggedInUserId,
      },
    },
  });

  return (
    <div className="group bg-slate-50 dark:bg-nav-dark shadow-md rounded-md w-full h-fit p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="font-bold text-base">
          {post.author.name +
            (loggedInUserId === post.authorId ? " (you)" : "")}
        </span>
        {loggedInUserId === post.authorId && (
          <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear">
            <EditPostForm id={post.id} content={post.content} />
            <DeletePostForm postId={post.id} />
          </div>
        )}
      </div>

      <p className="text-lg leading-relaxed">{post.content}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold text-purple-600">
          Posted{" "}
          {formatDistance(post.createdAt, new Date(), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </span>

        <div className="flex gap-4 items-center text-red-600">
          <form
            action={likePostAction}
            className="flex items-center justify-center"
          >
            <input type="hidden" name="postId" value={post.id} />
            <button type="submit">
              <Heart
                className={
                  userLikePost === null ? "hover:fill-red-600" : "fill-red-600"
                }
              />
            </button>
          </form>
          <span>{post.likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
