import Link from "next/link"
import UserAuthForm from "@/components/UserAuthForm"

export default function LoginPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center space-y-2 text-center mb-6">
          <div className="bg-brand rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-2">
            r
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm max-w-xs mx-auto text-slate-400">
            By continuing, you are setting up a RedditClone account and agree to our User Agreement and Privacy Policy.
          </p>
        </div>

        <UserAuthForm type="login" />

        <p className="px-8 text-center text-sm text-slate-400 mt-6">
          New to RedditClone?{" "}
          <Link href="/signup" className="hover:text-brand text-sm font-medium underline underline-offset-4">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
