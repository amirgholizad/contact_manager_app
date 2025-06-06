// components/user-card.tsx
"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"

export function UserCard({
  email,
  imageUrl,
  createdAt,
}: {
  email: string
  imageUrl?: string
  createdAt: number
}) {
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-700 pb-4">
      <div className="flex items-center gap-2 w-[50%]">
        <Avatar className="size-10 md:size-12 bg-[#D9D9D9] rounded-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#D9D9D9] rounded-full" />
          )}
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm md:text-md">{email}</div>
          <span className="pt-1 text-xs text-gray-400">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Link href={"/contacts/create"}>
        <div className="hover:opacity-50">
          <Plus />
        </div>
      </Link>
    </div>
  )
}
