import { PrismaClient } from "@prisma/client";
import { users, posts } from "./data";

const prisma = new PrismaClient();

async function seed() {
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
