"use server"

import { currentUser } from "@clerk/nextjs/server"

import { ContactForm } from "@/components/contact-form"

export default async function Page() {
  const user = await currentUser()
  if (!user) {
    return (
      <div className="text-center">
        You must be logged in to create a contact.
      </div>
    )
  }
  return <ContactForm action="create" userId={`${user.id}`} />
}
