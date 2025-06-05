"use client"

import { useState } from "react"
import Link from "next/link"
import { SearchIcon, X } from "lucide-react"

import { Contact, ensureName, sortByName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SearchBarProps = {
  contacts: Contact[]
}

export function ContactList({ contacts }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = searchQuery
    ? sortByName(
        ensureName(
          [...contacts].filter((contact) => {
            const searchContent = `${contact.contactName}`.toLowerCase()
            return searchContent.includes(searchQuery.toLowerCase())
          })
        )
      )
    : sortByName(ensureName([...contacts.map((contact) => ({ ...contact }))]))

  return (
    <section>
      <div className="relative flex items-center w-full max-w-xs md:max-w-md lg:max-w-[450px]">
        <Input
          className="h-8 rounded-full pl-4 pr-12 text-sm bg-slate text-slate-100 border-0"
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
          {filteredContacts.map((contact, index) => (
            <Link
              href={`/contacts/${contact.contactId}`}
              key={contact.contactId}
              className="hover:cursor-pointer"
            >
              <li
                key={index}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {contact.contactName}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  )
}
