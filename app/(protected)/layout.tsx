import React from "react"
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <section className="relative flex min-h-screen flex-col">
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </section>
  )
}
