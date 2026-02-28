"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    addToFavorites,
    removeFromFavorites,
    getMyFavorites,
} from "@/services/favorite.service";
import { toast } from "sonner";
import { EntityType } from "@/interfaces";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

type FavoriteMap = {
    hotel: string[];
    restaurant: string[];
    landmark: string[];
    program: string[];
};

interface FavoriteContextType {
    favorites: FavoriteMap;
    toggleFavorite: (id: string, type: EntityType) => void;
    isFavorite: (id: string, type: EntityType) => boolean;
    loading: boolean;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children, }: { children: React.ReactNode; }) => {
    const [favorites, setFavorites] = useState<FavoriteMap>({ hotel: [], restaurant: [], landmark: [], program: [], });

    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const { isAuthenticated } = useAuth();


    //     GET 
    useEffect(() => {
        const fetchFavorites = async () => {

            if (!isAuthenticated) {
                setFavorites({ hotel: [], restaurant: [], landmark: [], program: [], });
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const data = await getMyFavorites(token);

                setFavorites({
                    hotel: data.hotels.map((h) => h.id),
                    restaurant: data.restaurants.map((r) => r.id),
                    landmark: data.landmarks.map((l) => l.id),
                    program: data.programs.map((p) => p.id),
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [isAuthenticated]);

    //    toggle logic
    const toggleFavorite = async (id: string, type: EntityType) => {
        const token = localStorage.getItem("token");


        if (!token) {
            toast.error("Please login first");
            router.push("/login");
            return;
        }

        const isFav = favorites[type].includes(id);

        //   Optimistic Update
        setFavorites((prev) => ({
            ...prev,
            [type]: isFav
                ? prev[type].filter((item) => item !== id)
                : [...prev[type], id],
        }));

        try {
            if (isFav) {
                await removeFromFavorites(token, id, type);
                toast("Item Removed Successfully", {
                    icon: <Trash2 size={18} />,
                    style: {
                        background: "#FDECEC",
                        color: "#7F1D1D",
                        border: "1px solid #FCA5A5",
                    },
                });

            } else {
                await addToFavorites(token, id, type);
                toast.success("Item Added Successfully", {
                    style: {
                        background: "#0D3B66",
                        color: "white",
                        border: "1px solid #D3A15C"
                    },
                });
            }

        } catch (err) {
            // Rollback لو حصل error
            setFavorites((prev) => ({
                ...prev,
                [type]: isFav
                    ? [...prev[type], id]
                    : prev[type].filter((item) => item !== id),
            }));

            toast.error("Something went wrong", {
                style: {
                    background: "#8B0000",
                    color: "white",
                },
                description: "Please try again",
            });
        }
    };

    const isFavorite = (id: string, type: EntityType) => {
        return favorites[type].includes(id);
    };

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (!context)
        throw new Error("useFavorites must be used within FavoriteProvider");
    return context;
};
