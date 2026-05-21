import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export default function proxy(req: NextRequest) {
  return withAuth({
    pages: {
      signIn: '/login',
    },
  })(req as any, {} as any)
}

export const config = {
  matcher: [
    "/r/create",
    "/r/:slug/submit",
  ],
}
