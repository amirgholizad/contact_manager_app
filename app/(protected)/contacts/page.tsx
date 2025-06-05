import { type Contact } from "@/lib/utils"
import { ContactList } from "@/components/contact-list"
import { UserCard } from "@/components/user-card"

const contacts: Contact[] = [
  { contactName: "John Doe", contactId: "1" },
  { contactName: "Mary Johnson", contactId: "2" },
  { contactName: "James Smith", contactId: "3" },
  { contactName: "Emily Davis", contactId: "4" },
  { contactName: "Michael Brown", contactId: "5" },
]

export default function ContactsPage() {
  return (
    <div className="flex flex-col h-dvh w-full max-w-[500px] items-center justify-center gap-6 px-10 md:py-10">
      <UserCard />
      <ContactList contacts={contacts} />
    </div>
  )
}
