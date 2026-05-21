"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare } from "lucide-react"
import CommentForm from "./CommentForm"

type CommentNode = {
  id: string
  content: string
  createdAt: Date
  author: { username: string }
  replyToId: string | null
  children: CommentNode[]
}

export default function CommentItem({ comment, postId }: { comment: CommentNode, postId: string }) {
  const [isReplying, setIsReplying] = useState(false)

  return (
    <div className="flex flex-col gap-1 text-sm border-l-2 border-slate-800 pl-4 py-2 mt-2">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="font-bold text-slate-200">u/{comment.author.username}</span>
        <span>•</span>
        <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
      </div>
      <p className="text-slate-200 mt-1 whitespace-pre-wrap">{comment.content}</p>
      
      <div className="flex items-center gap-4 mt-1 mb-2">
        <button 
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:bg-slate-800 p-1.5 rounded transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Reply
        </button>
      </div>

      {isReplying && (
        <div className="mt-2 mb-4 pr-4">
          <CommentForm postId={postId} replyToId={comment.id} onSuccess={() => setIsReplying(false)} />
        </div>
      )}

      {comment.children.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {comment.children.map(child => (
            <CommentItem key={child.id} comment={child} postId={postId} />
          ))}
        </div>
      )}
    </div>
  )
}
