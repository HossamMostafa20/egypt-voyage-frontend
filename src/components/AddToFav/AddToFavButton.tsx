// "use client";

// import { HeartIcon, Loader2 } from "lucide-react";
// import { useFavorites } from "@/context/FavoriteContext";
// import { FavoriteType } from "@/interfaces/FavoriteList";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// interface Props {
//   itemId: string;
//   type: FavoriteType;
// }

// export default function FavoriteToggle({ itemId, type }: Props) {
//   const { isInFavorites, toggleFavorite } = useFavorites();
//   const [loading, setLoading] = useState(false);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       await toggleFavorite(itemId, type);

//       if (isInFavorites(itemId, type)) {
//         toast.success("Added to favorites ❤️");
//       } else {
//         toast.success("Removed from favorites");
//       }
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div onClick={handleClick} className="cursor-pointer">
//       {loading ? (
//         <Loader2 className="animate-spin text-red-500" />
//       ) : (
//         <HeartIcon
//           className={
//             isInFavorites(itemId, type)
//               ? "fill-red-500 text-red-500 transition"
//               : "text-gray-800 transition"
//           }
//         />
//       )}
//     </div>
//   );
// }
