// components/clerk-with-theme-provider.tsx
"use client"

import React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export function ClerkWithThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  console.log("Current theme:", theme)

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  )
}
