"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SearchIcon, X } from "lucide-react"

import { Contact, ensureName, sortByName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactList({ userId }: { userId: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactList, setContactList] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchContacts = async () => {
      const res = await fetch(`/api/contacts?userId=${userId}`)
      if (res.ok) {
        const data = await res.json()
        console.log("Fetched contacts:", data)
        const contactRaw = data.map((contact: any) => ({
          contactName: contact.contact_name,
          contactId: contact.contact_id,
        }))

        setContactList(contactRaw)
        setLoading(false)
      } else {
        console.error("Failed to fetch contacts")
      }
    }
    fetchContacts()
  }, [])

  const filteredContacts = searchQuery
    ? sortByName(
        ensureName(
          [...contactList].filter((contact) => {
            const searchContent = `${contact.contactName}`.toLowerCase()
            return searchContent.includes(searchQuery.toLowerCase())
          })
        )
      )
    : sortByName(
        ensureName([...contactList.map((contact) => ({ ...contact }))])
      )

  return (
    <section className="flex flex-col items-center w-full ">
      <div className="relative flex items-center w-full">
        <Input
          className="h-8 w-full rounded-full pl-4 pr-12 text-sm"
          placeholder="Search"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        <div className="absolute right-2 flex items-center gap-1">
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="p-0 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3 text-gray-500" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="p-0 h-6 w-6">
            <SearchIcon className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
      <div className="mt-4 w-full max-w-md">
        <ul className="flex flex-col gap-2">
          {loading ? (
            <p>Loading</p>
          ) : contactList.length === 0 ? (
            <p>You have no contacts!</p>
          ) : (
            filteredContacts.map((contact, index) => (
              <li
                key={index}
                className="p-2 rounded-lg hover:opacity-50 transition-colors"
              >
                <Link
                  href={`/contacts/${contact.contactId}`}
                  className="hover:cursor-pointer"
                >
                  {contact.contactName}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}
