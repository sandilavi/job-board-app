'use client'
import { useState } from "react"
import '../../../styles/global.css';

export default function JobAddPage() {
    const [form, setForm] = useState ({
        position: '',
        company: '',
        location: '',
        jobType: '',
        postedDate: '',
        //userId: 1
    })

    const handleChange = (e) => { //Function called whenever input field changes
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault() //Stops the browser's default behaviour

        await fetch('/api/jobs', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        alert('Job Added!')
    }

    return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Post a New Job</h2>

        <div>
            <input name="position" placeholder="Position" onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
            <input name="company" placeholder="Company Name" onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
            <input name="location" placeholder="Location" onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
            <select name="jobType" onChange={handleChange} value={form.jobType} className="border p-2 w-full rounded" required>
                <option value="" disabled>Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
            </select>
        </div>
        <div>
            <input name="postedDate" placeholder="Posted Date" onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Post Job</button>
        </div>
    </form>
    )
}