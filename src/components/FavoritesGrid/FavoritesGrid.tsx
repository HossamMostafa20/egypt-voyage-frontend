export default function FavoritesGrid({ children }: { children: React.ReactNode }) {
    return <>
        <div className="container mx-auto p-2 lg:p-1.5 xl:p-2 md:p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
            {children}
        </div>
    </>
}
