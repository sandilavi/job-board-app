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
            <h1 className='text-2xl font-bold mb-3'>Job Listings</h1>
            <p className="text-md mb-2 font-bold">{jobs.length} jobs are available</p>
            {jobs.length === 0? (
                <p>No jobs posted yet!</p>
            ) : (
            <ul className='grid md:grid-cols-2 gap-4'>
                {jobs.map((job) => (
                    <li key={job.id} className='border p-4 rounded-xl'>
                        <h2 className='text-2xl font-bold text-blue-600'>{job.position}</h2>
                        <p className='text-sm text-gray-600 italic'>{job.company}</p>
                        <p className='text-sm text-gray-700'>{job.location} | {job.jobType}</p>
                        <p className='text-xs text-gray-500'>Posted on : {new Date(job.createAt).toLocaleDateString()}</p>
                        <p className='text-sm mt-2 text-black-800'>{job.description}</p>
                    </li>
                ))}
            </ul>
            )}
        </div>
    )
}
