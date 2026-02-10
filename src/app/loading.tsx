import React from 'react'

export default function Loading() {
    return <>
        <div className="flex items-center justify-center h-screen">
            <img src="/logo.jpg" className="size-20 animate-spin" />
        </div>
    </>
}
