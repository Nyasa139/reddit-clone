import { prisma } from "@/lib/prisma"
import PostItem from "@/components/PostItem"

export const dynamic = "force-dynamic"

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true,
      community: true,
      votes: true,
      _count: {
        select: { comments: true }
      }
    },
    take: 20
  })

  return (
    <>
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-2">Home Feed</h1>
        {posts.length === 0 ? (
          <div className="text-center text-slate-500 py-10 glass-panel rounded-xl">
            No posts yet. Why not create a community and post something?
          </div>
        ) : (
          posts.map(post => <PostItem key={post.id} post={post} />)
        )}
      </div>

      <div className="hidden md:block md:w-1/3">
        <div className="glass-panel rounded-xl p-6 sticky top-24 shadow-2xl">
          <h2 className="font-bold text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">Home</h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Your personal RedditClone frontpage. Come here to check in with your favorite communities.
          </p>
          <a
            href="/r/create"
            className="w-full block text-center bg-brand hover:bg-brand-light text-white font-semibold py-2 rounded-full transition-colors"
          >
            Create Community
          </a>
        </div>
      </div>
    </>
  )
}
