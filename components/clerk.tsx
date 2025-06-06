import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export async function ClerkWithThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  )
}
