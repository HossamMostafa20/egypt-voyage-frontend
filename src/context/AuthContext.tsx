"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { getToken, setToken as saveToken, clearToken } from "@/lib/authToken";

/* ---------- Type Definition ---------- */

type AuthContextType = {
    isLoggedIn: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
};

/* ---------- Create Context ---------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------- Provider ---------- */

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
        setLoading(false);
    }, []);

    const login = (token: string): void => {
        saveToken(token);
        setIsLoggedIn(true);
    };

    const logout = (): void => {
        clearToken();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

/* ---------- Hook ---------- */

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
