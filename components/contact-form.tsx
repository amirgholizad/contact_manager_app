"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useForm } from "react-hook-form"
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
}

export function ContactForm({ action }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    // You can add logic to save data or call an API
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
          {" "}
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" {...register("contactEmail")} />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        <div className="w-full max-w-md flex flex-col gap-2">
          {" "}
          <Label htmlFor="contactPhone">Phone</Label>
          <Input id="contactPhone" {...register("contactPhone")} />
          {errors.contactPhone && (
            <p className="text-sm text-red-500">
              {errors.contactPhone.message}
            </p>
          )}
        </div>

        <Button type="submit">Save Contact</Button>
      </form>
    </section>
  )
}
