"use server"

import { currentUser } from "@clerk/nextjs/server"

import { ContactList } from "@/components/contact-list"
import { UserCard } from "@/components/user-card"

export default async function ContactsPage() {
  const user = await currentUser()
  if (!user) {
    return (
      <div className="text-center">You must be logged in to view contacts.</div>
    )
  }

  return (
    <div className="flex flex-col h-dvh w-full max-w-[500px] items-center justify-center gap-6 px-10 md:py-10">
      <UserCard
        email={user.emailAddresses[0].emailAddress}
        imageUrl={user.imageUrl}
        createdAt={new Date(user.createdAt).getTime()}
      />
      <ContactList userId={user.id} />
    </div>
  )
}
