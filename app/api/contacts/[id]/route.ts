import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const contactId = url.searchParams.get("contactId")
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("contact_id", contactId)
      .single()

    if (error) {
      throw error
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PUT(req: Request) {
  const url = new URL(req.url)

  const contactId = url.searchParams.get("contactId")

  const updatedContact = await req.json()
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("contacts")
      .update({
        contact_name: updatedContact.contactName,
        contact_email: updatedContact.contactEmail || null,
        contact_phone: updatedContact.contactPhone || null,
      })
      .eq("contact_id", contactId)

    if (error) {
      console.error("Error updating contact:", error)
    }
    console.log("Updated contact:", data)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const contactId = url.searchParams.get("contactId")
  const supabase = await createClient()

  if (!contactId) {
    return new Response(JSON.stringify({ error: "Contact ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const { data, error } = await supabase
      .from("contacts")
      .delete()
      .eq("contact_id", contactId)

    if (error) {
      throw error
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
