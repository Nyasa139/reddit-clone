import Link from "next/link"
import { Search, Plus, Bell } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserAccountNav from "./UserAccountNav"

const Navbar = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div className="fixed top-0 inset-x-0 h-16 glass-panel z-50 py-2 border-t-0 border-l-0 border-r-0 border-b border-glass-border">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 px-4">
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <div className="bg-brand rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
            r
          </div>
          <p className="hidden text-sm font-medium md:block">RedditClone</p>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search RedditClone"
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link
                href="/r/create"
                className="hidden sm:flex items-center gap-1 text-sm font-medium hover:bg-slate-800 px-3 py-1.5 rounded-full transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Community
              </Link>
              <button className="p-2 hover:bg-slate-800 rounded-full transition-colors relative">
                <Bell className="h-5 w-5 text-slate-300" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border border-slate-900"></span>
              </button>
              <UserAccountNav user={session.user} />
            </>
          ) : (
            <Link
              href="/login"
              className="bg-brand hover:bg-brand-light text-white px-4 py-2 rounded-full font-medium text-sm transition-colors"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
