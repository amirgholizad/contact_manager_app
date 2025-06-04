"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  const router = useRouter()
  return (
    <section className="flex flex-col justify-center items-center h-dvh gap-6 px-10 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight text-center tracking-tighter md:text-4xl">
        Contact list projcet with CRUD operations and authentication
      </h1>
      <h1 className="text-2xl font-extrabold leading-tight text-center tracking-tighter md:text-3xl">
        Built with Next.js, Radix UI, Tailwind CSS, Supabase, and Clerk
      </h1>
      <Button
        variant="default"
        size={"lg"}
        onClick={() => router.push("/contacts")}
      >
        Go to your contact list
      </Button>
    </section>
  )
}
