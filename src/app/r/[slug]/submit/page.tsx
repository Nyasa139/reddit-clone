"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function SubmitPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/community/${params.slug}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to create post")

      router.push(`/r/${params.slug}/comments/${data.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="border-b border-slate-800 pb-4 mb-6">
        <h1 className="text-xl font-bold text-slate-100">Create a post</h1>
        <p className="text-sm text-slate-400 mt-1">in r/{params.slug}</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand font-medium text-lg placeholder:font-normal"
              maxLength={300}
              required
              disabled={isLoading}
            />
            <div className="flex justify-end mt-1">
              <span className="text-xs text-slate-500">{title.length}/300</span>
            </div>
          </div>

          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Text (optional)"
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-brand min-h-[160px] resize-y"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-full transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || title.length === 0}
              className="bg-brand hover:bg-brand-light text-white px-6 py-2 rounded-full font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
