//Job listing for the admin
'use client';
import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import '../../../styles/global.css';

export default function JobList() {
    const {data:session, status} = useSession();
    const [jobs, setJobs] = useState([]);
    const router = useRouter();

    //Fetch jobs from backend API
    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn();
        }
        else if (status === "authenticated" && session?.user?.role === 'admin') {
            const fetchJobs = async() => {
                try {
                    const res = await fetch('/api/jobs');
                    const data = await res.json();
                    setJobs(data);
                } catch (err) {
                    console.error("Failed to fetch jobs", err);
                }
                
            }
            fetchJobs();
        }
    }, [status, session]);

    if (status !== 'authenticated') return <div className="flex items-center justify-center min-h-screen text-4xl text-green-700">Loading...</div>

    const deleteJob = async (id) => {
        try {
            const response = await fetch(`/api/jobs/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
            }
            else {
                console.error('Failed to delete the job.');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    }

    return (
    <div>
        <Navbar />
        <div className="p-4">
            <div className="flex justify-between w-full mb-4">
                <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
                <button onClick={() => router.push('/admin/job-add')} className="bg-yellow-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-yellow-600">+ Add New Job</button>
            </div>
            <p className="text-md mb-3 font-bold">{jobs.length} jobs are available</p>

            {jobs.length === 0? (
                <p>No jobs posted yet!</p>
            ) : (
            <table>
            <thead className="bg-gray-200">
            <tr>
                <th className="text-left px-2 py-2">Position</th>
                <th className="text-left px-2 py-2">Company</th>
                <th className="text-left px-2 py-2">Location</th>
                <th className="text-left px-2 py-2">Job Type</th>
                <th className="text-left px-2 py-2">Posted Date</th>
                <th className="text-left px-2 py-2">Description</th>
                <th className="text-left px-2 py-2">Actions</th>
            </tr>
            </thead>

            <tbody className="bg-gray-100">
            {jobs.map((job) => (
            <tr key={job.id}>
                <td className="text-left px-2 py-2 text-gray-800 text-sm">{job.position}</td>
                <td className="text-left px-2 py-2 text-gray-800 text-sm">{job.company}</td>
                <td className="text-left px-2 py-2 text-gray-800 text-sm">{job.location}</td>
                <td className="text-left px-2 py-2 text-gray-800 text-sm">{job.jobType}</td>
                <td className="text-left px-2 py-2 text-gray-800 text-sm">{new Date(job.createAt).toLocaleDateString()}</td>
                <td className="text-left px-2 py-2 text-gray-800 text-sm">{job.description}</td>          
                <td className="text-left px-2 py-2">
                <button onClick={() =>
                    {if (confirm("Are you sure you want to delete this job?")) {
                        deleteJob(job.id);
                    }}}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-red-600">Delete
                </button>
                </td>
            </tr>
            ))}
            </tbody>
            </table>
            )}
        </div>
    </div>
    )
}
