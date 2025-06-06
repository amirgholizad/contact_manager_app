"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  contactName: z.string().min(1, "Name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z
    .string()
    .min(10, "Phone number should be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
})

type FormData = z.infer<typeof formSchema>

type ContactFormProps = {
  action: "create" | "edit"
  userId: string
}

export function ContactForm({ action, userId }: ContactFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split("/")
  const contactId = segments[segments.length - 1]

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (action === "edit") {
      // Fetch existing contact data if editing
      const fetchContact = async () => {
        try {
          const res = await fetch(
            `/api/contacts/${userId}?contactId=${contactId}`,
            {
              method: "GET",
            }
          )
          if (!res.ok) throw new Error("Failed to fetch contact")

          const data = await res.json()
          // Populate form with existing contact data
          if (data) {
            setValue("contactName", data.contact_name)
            setValue("contactEmail", data.contact_email)
            setValue("contactPhone", data.contact_phone)
          }
        } catch (error) {
          toast.error("Failed to load contact data")
        }
      }

      fetchContact()
    }
  }, [userId])
  const onSubmit = async (data: FormData) => {
    if (action === "create") {
      try {
        const res = await fetch("/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            userId,
          }),
        })

        if (!res.ok) throw new Error("Something went wrong")

        toast.success("Contact created successfully!")

        // Redirect after 1 second
        setTimeout(() => {
          router.push("/contacts") // Replace with your actual route
        }, 1000)
      } catch (err) {
        toast.error("Failed to submit contact. Please try again.")
      }
    } else {
      try {
        const res = await fetch(
          `/api/contacts/${userId}?contactId=${contactId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...data,
              userId,
            }),
          }
        )

        if (!res.ok) throw new Error("Something went wrong")

        toast.success("Contact updated successfully!")

        // Redirect after 1 second
        setTimeout(() => {
          router.push("/contacts") // Replace with your actual route
        }, 1000)
      } catch (err) {
        toast.error("Failed to update contact. Please try again.")
      }
    }
  }

  return (
    <section className="flex flex-col h-dvh w-full max-w-md items-center justify-center gap-6 px-10 md:py-10">
      <Avatar className="size-10 md:size-12 bg-[#D9D9D9] rounded-full flex items-center justify-center">
        <User className="w-8 h-8 text-gray-600" />
      </Avatar>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center flex-col gap-4 justify-between w-full pb-4"
      >
        <div className="w-full max-w-md flex flex-col gap-2">
          <Label htmlFor="contactName">Name</Label>
          <Input id="contactName" {...register("contactName")} />
          {errors.contactName && (
            <p className="text-sm text-red-500">{errors.contactName.message}</p>
          )}
        </div>

        <div className="w-full max-w-md flex flex-col gap-2">
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" {...register("contactEmail")} />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        <div className="w-full max-w-md flex flex-col gap-2">
          <Label htmlFor="contactPhone">Phone</Label>
          <Input id="contactPhone" {...register("contactPhone")} />
          {errors.contactPhone && (
            <p className="text-sm text-red-500">
              {errors.contactPhone.message}
            </p>
          )}
        </div>

        <Button type="submit">Save Contact</Button>
        {action === "edit" && (
          <Button
            variant="destructive"
            onClick={async () => {
              try {
                const res = await fetch(
                  `/api/contacts/${userId}?contactId=${contactId}`,
                  {
                    method: "DELETE",
                  }
                )
                if (!res.ok) throw new Error("Failed to delete contact")

                toast.success("Contact deleted successfully!")
                setTimeout(() => {
                  router.push("/contacts") // Replace with your actual route
                }, 1000)
              } catch (err) {
                toast.error("Failed to delete contact. Please try again.")
              }
            }}
          >
            Delete Contact
          </Button>
        )}
      </form>
    </section>
  )
}
