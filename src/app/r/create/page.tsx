"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateCommunityPage() {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to create community")

      router.push(`/r/${data.slug}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 border-b border-slate-800 pb-2">Create a Community</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-lg font-medium text-slate-200 mb-1">Name</label>
            <p className="text-sm text-slate-400 mb-3">Community names including capitalization cannot be changed.</p>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 font-medium">r/</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 pl-7 text-white focus:outline-none focus:border-brand"
                maxLength={21}
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">{21 - name.length} Characters remaining</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 rounded-full transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || name.length < 3}
              className="bg-brand hover:bg-brand-light text-white px-4 py-2 rounded-full font-medium text-sm transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
