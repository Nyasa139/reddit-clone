import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reddit Clone MVP",
  description: "A functional Reddit clone with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-slate-950 text-slate-50 antialiased pt-16`}
      >
        <Providers>
          <Navbar />
          <main className="container max-w-7xl mx-auto h-full pt-12 flex gap-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
