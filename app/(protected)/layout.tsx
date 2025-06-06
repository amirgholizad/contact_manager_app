"use client"

import { RedirectToSignIn, useAuth } from "@clerk/nextjs"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { isSignedIn } = useAuth()

  if (isSignedIn === undefined) return null // or loading spinner

  if (!isSignedIn) {
    return <RedirectToSignIn />
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center w-full">
      {children}
    </section>
  )
}
