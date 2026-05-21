import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PATCH(req: Request, props: { params: Promise<{ postId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { type } = await req.json()
    if (type !== "UP" && type !== "DOWN") {
      return NextResponse.json({ message: "Invalid vote type" }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId }
    })

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.postId
        }
      }
    })

    if (existingVote) {
      if (existingVote.type === type) {
        // User clicked the same vote type, so remove the vote
        await prisma.vote.delete({
          where: {
            userId_postId: {
              userId: session.user.id,
              postId: params.postId
            }
          }
        })
        return NextResponse.json({ previousVote: existingVote.type, newVote: null })
      } else {
        // User changed their vote
        await prisma.vote.update({
          where: {
            userId_postId: {
              userId: session.user.id,
              postId: params.postId
            }
          },
          data: { type }
        })
        return NextResponse.json({ previousVote: existingVote.type, newVote: type })
      }
    } else {
      // New vote
      await prisma.vote.create({
        data: {
          type,
          userId: session.user.id,
          postId: params.postId
        }
      })
      return NextResponse.json({ previousVote: null, newVote: type })
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
