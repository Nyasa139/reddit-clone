import { formatDistanceToNow } from "date-fns"
import { MessageSquare } from "lucide-react"
import Link from "next/link"
import PostVoteClient from "./PostVoteClient"

type PostProps = {
  post: {
    id: string
    title: string
    content: string
    createdAt: Date
    author: { username: string }
    community: { name: string, slug: string }
    votes: { type: string }[]
    _count: { comments: number }
  }
}

export default function PostItem({ post }: PostProps) {
  const votesAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1
    if (vote.type === "DOWN") return acc - 1
    return acc
  }, 0)

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex transition-all duration-300 hover:shadow-brand/10 hover:shadow-xl hover:-translate-y-0.5">
      {/* Vote column */}
      <div className="w-12 bg-slate-900/30 p-2 flex flex-col items-center gap-1 border-r border-[rgba(255,255,255,0.08)]">
        <PostVoteClient postId={post.id} initialVotesAmt={votesAmt} />
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link href={`/r/${post.community.slug}`} className="font-bold text-slate-200 hover:underline">
            r/{post.community.name}
          </Link>
          <span>•</span>
          <span>Posted by u/{post.author.username}</span>
          <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>

        <Link href={`/r/${post.community.slug}/comments/${post.id}`}>
          <h2 className="text-lg font-medium text-slate-100">{post.title}</h2>
          <p className="text-sm text-slate-300 mt-1 line-clamp-3">{post.content}</p>
        </Link>

        {/* Footer */}
        <div className="flex gap-4 mt-2">
          <Link
            href={`/r/${post.community.slug}/comments/${post.id}`}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:bg-slate-800 p-2 rounded transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            {post._count.comments} Comments
          </Link>
        </div>
      </div>
    </div>
  )
}
