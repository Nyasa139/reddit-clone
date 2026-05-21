import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request, props: { params: Promise<{ postId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { content } = await req.json()
    if (!content) {
      return NextResponse.json({ message: "Content is required" }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: { id: params.postId }
    })

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: post.id,
        authorId: session.user.id
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
