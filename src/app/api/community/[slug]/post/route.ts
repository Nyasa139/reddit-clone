import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await req.json()
    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const community = await prisma.community.findUnique({
      where: { slug: params.slug }
    })

    if (!community) {
      return NextResponse.json({ message: "Community not found" }, { status: 404 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content: content || "",
        communityId: community.id,
        authorId: session.user.id
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
