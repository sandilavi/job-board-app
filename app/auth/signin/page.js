'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import '../../../styles/global.css';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            alert("Invalid Credentials.");
        }
        else {
            router.push("/admin/job-list");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="shadow-md bg-gray-100 p-3 rounded">
            <h1 className="ml-2 text-2xl">Log In</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
             className="px-4 py-2 border rounded border-gray-300 block m-2 w-100" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
             className="px-4 py-2 border rounded border-gray-300 block m-2 w-100" />
            <button type="submit" className="px-4 py-2 rounded text-white bg-blue-500 block m-2 cursor-pointer hover:bg-blue-600">Sign In</button>
        </form>
        </div>
    )
}