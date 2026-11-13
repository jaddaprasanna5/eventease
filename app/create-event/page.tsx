"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CreateEventPage(){

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    category: "Technology",
    price: "",
    date: "",
    image: "",
  })

  // when user types
  const handleChange = (e:any)=>{
    const {name, value} = e.target
    setForm({...form, [name]: value})
  }

  // submit to database
  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    console.log("form submit", form)

    if(!form.title || !form.description || !form.location){
      setMsg("Please fill required fields")
      return
    }

    setLoading(true)
    try{
      const res = await fetch("/api/events",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      })

      const result = await res.json()
      console.log("api result", result)

      if(result.success || result.id){ // both cases handle
        setMsg("Event Created! Redirecting...")
        setTimeout(()=>{
          router.push("/")
        }, 1000)
      } else {
        setMsg("Failed to create")
      }

    }catch(err){
      console.log("error", err)
      setMsg("Error in creating")
    }finally{
      setLoading(false)
    }
  }

  return(
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <Link href="/" className="text-blue-600 text-sm hover:underline">← Back to Home</Link>

        <h1 className="text-2xl font-bold mt-4 mb-6">Create New Event</h1>

        {msg && <p className="bg-yellow-100 border p-2 mb-4 text-sm rounded">{msg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="ex: Web Dev Bootcamp" className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="about event..." className="w-full border rounded px-3 py-2 mt-1"></textarea>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Location *</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Kukatpally, Hyderabad" className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1">
                <option>Technology</option>
                <option>Business</option>
                <option>Workshop</option>
                <option>Entertainment</option>
                <option>Music</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Price (₹)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="699" className="w-full border rounded px-3 py-2 mt-1" />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Date</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Image URL (optional)</label>
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://image link" className="w-full border rounded px-3 py-2 mt-1" />
          </div>

          <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mt-2">
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  )
}