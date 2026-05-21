import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import PostItem from "@/components/PostItem"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function CommunityPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const community = await prisma.community.findUnique({
    where: { slug: params.slug },
    include: {
      posts: {
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
          community: true,
          votes: true,
          _count: { select: { comments: true } }
        }
      }
    }
  })

  if (!community) {
    return notFound()
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Community Header */}
      <div className="h-20 bg-brand/20 -mx-4 -mt-12 mb-4"></div>
      <div className="flex items-start justify-between -mt-12 px-4 mb-4">
        <div className="flex items-end gap-4">
          <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center text-3xl font-bold text-white border-4 border-slate-950">
            r/
          </div>
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-slate-100">{community.name}</h1>
            <p className="text-sm font-medium text-slate-400">r/{community.slug}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="glass-panel rounded-xl p-4 flex gap-3 items-center mb-2 shadow-lg">
            <div className="bg-slate-800 rounded-full w-10 h-10 flex-shrink-0"></div>
            <Link 
              href={`/r/${community.slug}/submit`}
              className="flex-1 bg-slate-950/50 border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-slate-900/50 transition-colors rounded-md px-4 py-2 text-slate-400 text-sm cursor-text"
            >
              Create Post
            </Link>
          </div>

          {community.posts.length === 0 ? (
            <div className="text-center text-slate-500 py-10 glass-panel rounded-xl">
              There are no posts in this community yet.
            </div>
          ) : (
            community.posts.map(post => <PostItem key={post.id} post={post} />)
          )}
        </div>

        <div className="hidden md:block md:w-1/3">
          <div className="glass-panel rounded-xl p-6 sticky top-24 shadow-2xl">
            <div className="border-b border-[rgba(255,255,255,0.08)] pb-3 mb-3">
              <h2 className="font-bold text-slate-300">About Community</h2>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Welcome to r/{community.name}! 
            </p>
            <div className="flex items-center justify-between text-sm text-slate-300 mb-6 border-b border-[rgba(255,255,255,0.08)] pb-4">
              <div className="flex flex-col">
                <span className="font-bold">{community.posts.length}</span>
                <span className="text-slate-500 text-xs">Posts</span>
              </div>
            </div>
            <Link
              href={`/r/${community.slug}/submit`}
              className="w-full block text-center bg-brand hover:bg-brand-light text-white font-semibold py-2 rounded-full transition-colors"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
