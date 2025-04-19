'use client';
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function SessionWatcher() {
    const {status} = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const hasRedirect = useRef(false);

    useEffect(() => {
        if (status === 'unauthenticated' && pathname !== '/auth/signin' && hasRedirect.current) {
            hasRedirect.current = true;
            router.push('/auth/signin');
        }
    }, [status, pathname, router]);

    return null;
}