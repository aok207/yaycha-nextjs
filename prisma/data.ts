import { Prisma } from "@prisma/client";

export const users = [
  {
    name: "Alice",
    email: "alice@example.com",
    password: "password123", // Hash in production
  },
  {
    name: "Bob",
    email: "bob@example.com",
    password: "password456",
  },
];

export const posts: Prisma.PostCreateInput[] = [
  {
    content:
      "Alice's first post: Exploring the basics of web development and how HTML, CSS, and JavaScript work together to create beautiful and interactive websites. Web development has evolved significantly over the years, and there are many tools available that make building modern web applications easier than ever.",
    author: {
      connect: {
        email: users[0].email,
      },
    },
  },
  {
    content:
      "Alice's second post: Learning Next.js has been a game-changer for me. The framework is incredibly powerful, offering features like server-side rendering, static site generation, and API routes all out of the box. I’ve been experimenting with it to build a blog application, and the performance is amazing!",
    author: {
      connect: {
        email: users[0].email,
      },
    },
  },
  {
    content:
      "Bob's first post: I’ve been working on a project using Prisma ORM with PostgreSQL, and I must say the experience is seamless. The migrations, schema modeling, and database access are all handled in such an intuitive way. Prisma truly abstracts the complexities of database interactions.",
    author: {
      connect: {
        email: users[0].email,
      },
    },
  },
  {
    content:
      "Alice's third post: Today, I want to dive into TypeScript. It’s not just JavaScript with types; it helps me catch errors early, improves collaboration on larger projects, and provides better tooling support. It’s becoming an essential skill for front-end developers, especially when working with React.",
    author: {
      connect: {
        email: users[1].email,
      },
    },
  },
  {
    content:
      "Bob's second post: One of my favorite things about modern JavaScript is async/await. It makes writing asynchronous code feel synchronous, which significantly improves readability. The days of callback hell are long gone, and promises combined with async/await make handling async operations so much simpler.",
    author: {
      connect: {
        email: users[1].email,
      },
    },
  },
  {
    content:
      'Bob\'s third post: I’ve started learning about Docker and how to containerize applications. It’s such a powerful tool for ensuring that applications run the same way in different environments. Gone are the days of "it works on my machine." With Docker, you can easily replicate the development environment on any machine.',
    author: {
      connect: {
        email: users[1].email,
      },
    },
  },
];
