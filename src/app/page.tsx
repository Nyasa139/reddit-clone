import { prisma } from "@/lib/prisma"
import PostItem from "@/components/PostItem"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function Home(props: { searchParams: Promise<{ sort?: string }> }) {
  const searchParams = await props.searchParams;
  const sort = searchParams?.sort || "hot";

  let orderBy: any = { score: 'desc' } // Default to "hot/top"
  if (sort === "new") {
    orderBy = { createdAt: 'desc' }
  } else if (sort === "top") {
    orderBy = { score: 'desc' }
  }

  const posts = await prisma.post.findMany({
    orderBy,
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
        <div className="glass-panel p-2 rounded-xl flex gap-2">
          <Link href="/?sort=hot" className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${sort === 'hot' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Hot</Link>
          <Link href="/?sort=new" className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${sort === 'new' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>New</Link>
          <Link href="/?sort=top" className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${sort === 'top' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>Top</Link>
        </div>
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
