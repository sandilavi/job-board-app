'use client';
import { useEffect, useState } from "react"
import '../../styles/global.css';

export default function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        //Fetch jobs from backend API
        const fetchJobs = async() => {
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();

                if (Array.isArray(data)) {
                    setJobs(data);
                }
                else {
                    console.error("Error fetching jobs:", error)
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }       
        };

        fetchJobs();
    }, []);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Job Listings</h1>
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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
