import { type Contact } from "@/lib/utils"
import { ContactList } from "@/components/contact-list"
import { UserCard } from "@/components/user-card"

export default function ContactsPage() {
  return (
    <div className="flex flex-col h-dvh w-full max-w-[500px] items-center justify-center gap-6 px-10 md:py-10">
      <UserCard />
      <ContactList />
    </div>
  )
}
