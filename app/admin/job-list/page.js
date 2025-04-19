//Job listing for the admin
'use client';
import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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

    if (status !== 'authenticated') return <div>Loading...</div>

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

    const handleSignOut = () => {
        signOut({callbackUrl:'/auth/signin'});
    }

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Job Listings</h1>
            {session && <div className="mb-1">Logged in as : {session.user.email}</div>}
            <button onClick={handleSignOut} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 mb-3">Sign Out</button>

            {jobs.length === 0? (
                <p>No jobs posted yet!</p>
            ) : (
                <ul className='space-y-4'>
                    {jobs.map((job) => (
                        <li key={job.id} className='border p-4 rounded shadow hover:shadow-md transition'>
                            <h2 className='text-xl font-semibold'>{job.position}</h2>
                            <p className='text-sm'>{job.company}</p>
                            <p className='text-sm'>{job.location}</p>
                            <p className='text-sm'>{job.jobType}</p>
                            <p className='text-sm'>{job.postedDate}</p>
                            <button onClick={() => deleteJob(job.id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-red-600">Delete Job</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-center">
                <button className="bg-yellow-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-yellow-600 mt-3">+ Add a New Job</button>
            </div>
        </div>
    )
}
