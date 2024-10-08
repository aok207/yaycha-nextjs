import Post from "@/components/shared/post";
import prisma from "@/lib/db";
import { getSession } from "@/lib/session";

export default async function Home() {
  const session = await getSession();

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="mx-auto my-20 w-[95%] sm:w-1/2 flex flex-col gap-10">
      {posts?.map((post) => (
        <Post
          post={post}
          loggedInUserId={session?.user.id ?? ""}
          key={post.id}
        />
      ))}
    </div>
  );
}
