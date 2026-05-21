import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name } = await req.json()
    if (!name || name.length < 3 || name.length > 21) {
      return NextResponse.json({ message: "Invalid community name" }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/\s+/g, '-')

    const existingCommunity = await prisma.community.findFirst({
      where: { slug }
    })

    if (existingCommunity) {
      return NextResponse.json({ message: "Community already exists" }, { status: 409 })
    }

    const community = await prisma.community.create({
      data: {
        name,
        slug
      }
    })

    return NextResponse.json(community, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
