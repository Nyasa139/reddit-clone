"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/post/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to add comment")

      setContent("")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && (
        <div className="p-2 mb-2 bg-red-900/50 border border-red-500 rounded text-red-200 text-xs">
          {error}
        </div>
      )}
      <div className="border border-slate-700 rounded-md overflow-hidden focus-within:border-brand bg-slate-950">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are your thoughts?"
          className="w-full bg-transparent p-3 text-sm text-slate-200 focus:outline-none min-h-[100px] resize-y"
          disabled={isLoading}
        />
        <div className="bg-slate-900 px-3 py-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || content.trim().length === 0}
            className="bg-brand hover:bg-brand-light text-white px-4 py-1.5 rounded-full font-medium text-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? "Commenting..." : "Comment"}
          </button>
        </div>
      </div>
    </form>
  )
}
