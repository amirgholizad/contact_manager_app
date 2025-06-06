// components/clerk-with-theme-provider.tsx
"use client"

import dynamic from "next/dynamic"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

const ClerkProvider = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.ClerkProvider),
  {
    ssr: false,
  }
)

export function ClerkWithThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

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
