import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { Plus } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

export async function UserCard() {
  const user = await currentUser()

  if (!user) {
    // You might want to redirect or handle this differently
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center justify-between w-full border-b border-gray-700 pb-4">
      <div className="flex items-center gap-2 w-[50%]">
        <Avatar className="size-10 md:size-12 bg-[#D9D9D9] rounded-full">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
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
          <div className="text-sm md:text-md">
            {user.emailAddresses[0].emailAddress}
          </div>
          <span className="pt-1 text-xs text-gray-400">
            {formatDate(new Date(user.createdAt).getTime())}
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
