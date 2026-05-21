"use client"

import { useState } from "react"
import { ArrowBigUp, ArrowBigDown } from "lucide-react"
import { useRouter } from "next/navigation"

type PostVoteClientProps = {
  postId: string
  initialVotesAmt: number
  initialVote?: "UP" | "DOWN" | null
}

export default function PostVoteClient({ postId, initialVotesAmt, initialVote }: PostVoteClientProps) {
  const [votesAmt, setVotesAmt] = useState(initialVotesAmt)
  const [currentVote, setCurrentVote] = useState(initialVote)
  const router = useRouter()

  const handleVote = async (type: "UP" | "DOWN") => {
    try {
      const res = await fetch(`/api/post/${postId}/vote`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login")
          return
        }
        throw new Error()
      }

      const { previousVote, newVote } = await res.json()

      // Calculate new vote amount visually
      if (previousVote === newVote) {
        // Vote removed
        setCurrentVote(null)
        setVotesAmt((prev) => prev + (type === "UP" ? -1 : 1))
      } else {
        // New vote or changed vote
        setCurrentVote(type)
        if (previousVote) {
          // Changed from UP to DOWN or DOWN to UP
          setVotesAmt((prev) => prev + (type === "UP" ? 2 : -2))
        } else {
          // New vote
          setVotesAmt((prev) => prev + (type === "UP" ? 1 : -1))
        }
      }
    } catch (err) {
      // In a real app, show toast error
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        onClick={(e) => { e.preventDefault(); handleVote("UP") }}
        className={`p-1 rounded transition-colors ${currentVote === "UP" ? "text-brand bg-slate-800" : "text-slate-400 hover:text-brand hover:bg-slate-800"}`}
      >
        <ArrowBigUp className="h-5 w-5" fill={currentVote === "UP" ? "currentColor" : "none"} />
      </button>
      <span className={`text-sm font-bold ${currentVote === "UP" ? "text-brand" : currentVote === "DOWN" ? "text-blue-500" : "text-slate-200"}`}>
        {votesAmt}
      </span>
      <button 
        onClick={(e) => { e.preventDefault(); handleVote("DOWN") }}
        className={`p-1 rounded transition-colors ${currentVote === "DOWN" ? "text-blue-500 bg-slate-800" : "text-slate-400 hover:text-blue-500 hover:bg-slate-800"}`}
      >
        <ArrowBigDown className="h-5 w-5" fill={currentVote === "DOWN" ? "currentColor" : "none"} />
      </button>
    </div>
  )
}
