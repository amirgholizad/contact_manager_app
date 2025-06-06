import { createClient } from "@/lib/supabase/server"
import { Contact } from "@/lib/utils"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = url.searchParams.get("userId")
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", userId)
    if (data?.length === 0) {
      console.log("No contacts found, inserting default contact")
      await supabase.from("users").insert({
        clerk_id: userId,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", userId)
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export async function POST(req: Request) {
  const newContact: Contact = await req.json()
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", newContact.userId)

    if (error) {
      throw error
    }

    if (data?.length === 0) {
      console.log("No contacts found, inserting default contact")
      await supabase.from("users").insert({
        clerk_id: newContact.userId,
      })
    }
  } catch (error) {
    console.error("Error checking user existence:", error)
    return new Response(
      JSON.stringify({ error: "Failed to check user existence" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const { contactName, userId } = newContact
  if (!contactName || !userId) {
    return new Response(
      JSON.stringify({ error: "Contact name and user ID are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
  const { data, error } = await supabase.from("contacts").insert({
    user_id: newContact.userId,
    contact_name: newContact.contactName,
    contact_email: newContact.contactEmail || null,
    contact_phone: newContact.contactPhone || null,
  })

  if (error) {
    console.error("Error inserting contact:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  })
}

export async function PATCH(req: Request) {
  const updatedContact: Contact = await req.json()
  const supabase = await createClient()

  if (!updatedContact.contactId || !updatedContact.contactName) {
    return new Response(
      JSON.stringify({ error: "Contact ID and name are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

  const { data, error } = await supabase
    .from("contacts")
    .update({
      contact_name: updatedContact.contactName,
      contact_email: updatedContact.contactEmail || null,
      contact_phone: updatedContact.contactPhone || null,
    })
    .eq("contact_id", updatedContact.contactId)

  if (error) {
    console.error("Error updating contact:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
