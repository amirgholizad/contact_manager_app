import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="https://github.com/AmirGholizad"
        className="flex items-center space-x-2"
      >
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/135760894?v=4" />
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
        <span className="inline-block font-bold text-md md:text-xl">
          Developed by AmirG
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
