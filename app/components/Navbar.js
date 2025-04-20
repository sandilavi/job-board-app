import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const {data: session} = useSession();

    const handleSignOut = () => {
        signOut({callbackUrl: '/auth/signin'});
    }

    return (
        <nav className="flex items-center justify-between w-full bg-gray-200">
            {session && (
            <div className="flex justify-between w-full">
                <div className="p-4"><span className="font-bold">Logged in as : </span><span className="text-sm text-gray-900 italic">{session.user.email}</span></div>
                <div className="pt-2 pr-2">
                    <button onClick={() => 
                    {if(confirm("Are you sure you want to sign out?")) {
                        handleSignOut();
                    }}}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 mb-3">Sign Out</button>
                </div>
            </div>
            )}
        </nav>
    )
}

export default Navbar;