import Link from "next/link"
import UserAuthForm from "@/components/UserAuthForm"

export default function SignUpPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-sm p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center space-y-2 text-center mb-6">
          <div className="bg-brand rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl mb-2">
            r
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
          <p className="text-sm max-w-xs mx-auto text-slate-400">
            Create an account to join communities, post, comment, and vote.
          </p>
        </div>

        <UserAuthForm type="signup" />

        <p className="px-8 text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="hover:text-brand text-sm font-medium underline underline-offset-4">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
