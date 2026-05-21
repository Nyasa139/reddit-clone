"use client"

import { LogOut, User } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function UserAccountNav({ user }: { user: { name?: string | null, email?: string | null } }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-slate-800 p-1 pr-2 rounded-full transition-colors border border-slate-800"
      >
        <div className="bg-slate-700 h-8 w-8 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-slate-300" />
        </div>
        <span className="text-sm font-medium hidden sm:block truncate max-w-[100px]">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl z-20 py-1 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-800">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Feed
            </Link>
            <Link
              href="/r/create"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Create Community
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                signOut({ callbackUrl: '/' })
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
