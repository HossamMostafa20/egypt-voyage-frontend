"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/authToken";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
    }, []);

    return isLoggedIn;
}
