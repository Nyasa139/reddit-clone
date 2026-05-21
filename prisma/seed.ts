import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create users
  const password = await bcrypt.hash('password123', 10)
  
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      username: 'AliceInWonderland',
      password,
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      username: 'BobTheBuilder',
      password,
    },
  })

  // Create communities
  const techCommunity = await prisma.community.upsert({
    where: { slug: 'technology' },
    update: {},
    create: {
      name: 'Technology',
      slug: 'technology',
    },
  })

  const designCommunity = await prisma.community.upsert({
    where: { slug: 'design' },
    update: {},
    create: {
      name: 'Design',
      slug: 'design',
    },
  })

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'The Future of AI in Web Development',
      content: 'Artificial Intelligence is revolutionizing the way we build websites. From generating boilerplate code to optimizing UI/UX automatically, AI tools are becoming indispensable. What are your favorite AI tools for development?',
      authorId: user1.id,
      communityId: techCommunity.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Glassmorphism: Is it still a trend in 2026?',
      content: 'Glassmorphism has been popular for a few years now. Does it still hold up today, or are we moving towards brutalism or neomorphism again? I personally still love the frosted glass look when used minimally.',
      authorId: user2.id,
      communityId: designCommunity.id,
    },
  })

  const post3 = await prisma.post.create({
    data: {
      title: 'Just released my new Next.js project!',
      content: 'I just finished building a fully functional social media MVP using Next.js 15, Prisma, and Tailwind CSS. The new App Router makes server-side rendering so seamless.',
      authorId: user1.id,
      communityId: techCommunity.id,
    },
  })

  // Create comments
  await prisma.comment.create({
    data: {
      content: 'I completely agree! Cursor and GitHub Copilot save me hours every day.',
      postId: post1.id,
      authorId: user2.id,
    },
  })

  await prisma.comment.create({
    data: {
      content: 'I think Glassmorphism is here to stay, but only as a subtle accent. Too much of it makes the UI look messy and hard to read.',
      postId: post2.id,
      authorId: user1.id,
    },
  })

  // Add some votes
  await prisma.vote.create({
    data: {
      type: 'UP',
      postId: post1.id,
      userId: user2.id,
    },
  })

  await prisma.vote.create({
    data: {
      type: 'UP',
      postId: post3.id,
      userId: user2.id,
    },
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
