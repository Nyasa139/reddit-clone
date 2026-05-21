import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import PostVoteClient from "@/components/PostVoteClient"

import CommentForm from "@/components/CommentForm"

export const dynamic = "force-dynamic"

export default async function PostDetailPage(props: { params: Promise<{ slug: string, postId: string }> }) {
  const params = await props.params;
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      author: true,
      community: true,
      votes: true,
      comments: {
        orderBy: { createdAt: 'desc' },
        include: { author: true }
      }
    }
  })

  if (!post || post.community.slug !== params.slug) {
    return notFound()
  }

  const votesAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1
    if (vote.type === "DOWN") return acc - 1
    return acc
  }, 0)

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 mt-4">
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        {/* Post Content */}
        <div className="glass-panel rounded-xl overflow-hidden flex shadow-xl">
          {/* Vote column */}
          <div className="w-12 bg-slate-900/30 p-2 flex flex-col items-center gap-1 border-r border-[rgba(255,255,255,0.08)] hidden sm:flex">
            <PostVoteClient postId={post.id} initialVotesAmt={votesAmt} />
          </div>

          <div className="p-4 flex-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Link href={`/r/${post.community.slug}`} className="font-bold text-slate-200 hover:text-brand transition-colors">
                r/{post.community.name}
              </Link>
              <span>•</span>
              <span>Posted by <span className="font-medium text-slate-300">u/{post.author.username}</span></span>
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-100 mb-4">{post.title}</h1>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>
            
            <div className="flex gap-4 mt-6 border-t border-[rgba(255,255,255,0.08)] pt-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:bg-slate-800/50 p-2 rounded-md transition-colors cursor-pointer">
                <MessageSquare className="h-4 w-4" />
                {post.comments.length} Comments
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="glass-panel rounded-xl p-6 shadow-xl mt-4">
          <CommentForm postId={post.id} />
          
          <div className="space-y-4">
            {post.comments.length === 0 ? (
              <p className="text-sm text-slate-500">No comments yet. Be the first to share what you think!</p>
            ) : (
              post.comments.map(comment => (
                <div key={comment.id} className="flex flex-col gap-1 text-sm border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-bold text-slate-200">u/{comment.author.username}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                  </div>
                  <p className="text-slate-200 mt-1 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/3">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 sticky top-20">
          <div className="border-b border-slate-800 pb-3 mb-3">
            <h2 className="font-bold text-slate-300">About Community</h2>
          </div>
          <Link href={`/r/${post.community.slug}`} className="flex items-center gap-2 mb-4 hover:underline">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs font-bold text-white">
              r/
            </div>
            <span className="font-bold">r/{post.community.name}</span>
          </Link>
          <p className="text-sm text-slate-400 mb-4 truncate">
            Welcome to r/{post.community.name}
          </p>
        </div>
      </div>
    </div>
  )
}
