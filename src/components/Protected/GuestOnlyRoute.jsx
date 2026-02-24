"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function GuestOnlyRoute({ children }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/"); // غيرها لو عايز يروح profile مثلاً
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn) return null;

    return children;
}
