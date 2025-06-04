import { type Contact } from "@/lib/utils"
import { ContactList } from "@/components/contact-list"
import { UserCard } from "@/components/user-card"

const contacts: Contact[] = [
  { contactName: "John Doe" },
  { contactName: "Jane Smith" },
  { contactName: "Alice Johnson" },
  { contactName: "Bob Brown" },
  { contactName: "Charlie Davis" },
]

export default function ContactsPage() {
  return (
    <div className="flex flex-col h-dvh w-full items-center justify-center">
      <UserCard />
      <ContactList contacts={contacts} />
    </div>
  )
}
