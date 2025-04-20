//Adding a new job
'use client'
import { useState } from "react"
import '../../../styles/global.css';
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function JobAddPage() {
    const {data:session, status} = useSession();
    const router = useRouter();

    const [form, setForm] = useState ({
        position: '',
        company: '',
        location: '',
        jobType: '',
        description: '',
    })

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn();
        }
        else if (status === "authenticated" && session?.user?.role === 'admin') {
            const fetchJobs = async() => {
                try {
                    const res = await fetch('/api/jobs');
                    const data = await res.json();
                    //setJobs(data);
                } catch (err) {
                    console.error("Failed to fetch jobs", err);
                }
                
            }
            fetchJobs();
        }
    }, [status, session]);

    if (status !== 'authenticated') return <div className="flex items-center justify-center min-h-screen text-4xl text-green-700">Loading...</div>

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
    <div>
        <Navbar />
        <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto bg-gray-100 rounded-xl shadow-md">
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
                <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full h-20 rounded" required />
            </div>
            <div className="flex justify-between w-full">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer">Post Job</button>
                <button type="button" onClick={() => router.push('/admin/job-list')} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition cursor-pointer">Back to Dashboard</button>
            </div>
        </form>
        </div>
    </div>
    )
}