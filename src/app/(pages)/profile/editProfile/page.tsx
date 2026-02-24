"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link'
import { usePathname } from "next/navigation"
import ProtectedRoute from "@/components/Protected/ProtectedRoute";
import React from 'react'

export default function EditProfile() {

    const pathname = usePathname();
    const baseBtn = `px-5 sm:px-6 py-2.5 sm:py-3 mb-2 sm:mb-0 rounded-xl sm:rounded-t-2xl sm:rounded-b-none font-semibold text-sm sm:text-base cursor-pointer`;
    const activeBtn = "bg-[#E1864F] text-white";
    const normalBtn = "bg-[#0D3B66] text-white";

    return <>
        <ProtectedRoute>
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-medium text-[#0D3B66] p-6 sm:p-9">Hi , Esraa</h1>

            <div className="flex flex-col items-center justify-center px-4">
                {/* Tabs */}
                <div className="flex flex-col sm:flex-row gap-3 z-10 w-80 sm:w-full sm:justify-center">
                    <Link href="/profile" className="w-full sm:w-auto">
                        <button className={`${baseBtn} w-full ${pathname === "/profile" ? activeBtn : normalBtn}`}>Profile Info</button>
                    </Link>

                    <Link href="/profile/editProfile" className="w-full sm:w-auto">
                        <button className={`${baseBtn} w-full ${pathname === "/profile/editProfile" ? activeBtn : normalBtn}`}>Edit Profile</button>
                    </Link>

                    <Link href="/profile/changePassword" className="w-full sm:w-auto">
                        <button className={`${baseBtn} w-full ${pathname === "/profile/changePassword" ? activeBtn : normalBtn}`}>Change password</button>
                    </Link>
                </div>

                {/* Card */}
                <div className="w-full max-w-5xl bg-[#E5BB7A] rounded-[30px] shadow-2xl mb-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#0D3B66] mt-6">Update Info</h2>

                    <div className='flex flex-col gap-2 p-4'>
                        {/* Profile Image */}
                        <div>
                            <Label className="text-lg ms-1.5 p-0.5">Profile Image</Label>
                            <Input type="file" className="h-10 cursor-pointer rounded-full bg-[#FFE4BC] file:bg-[#737373] file:text-white file:rounded-md file:border-0 file:px-4 file:py-1 file:mr-3" />
                        </div>

                        {/* Name */}
                        <div>
                            <Label className="text-lg ms-1.5 p-0.5">Name</Label>
                            <Input placeholder="Enter Your New Name" className="rounded-full bg-[#FFE4BC] px-6 py-5" />
                        </div>

                        {/* Email */}
                        <div>
                            <Label className="text-lg ms-1.5 p-0.5">Email</Label>
                            <Input type="email" placeholder="Enter Your New Email" className="rounded-full bg-[#FFE4BC] px-6 py-5" />
                        </div>

                        {/* Phone */}
                        <div>
                            <Label className="text-lg ms-1.5 p-0.5">Phone</Label>
                            <Input placeholder="Enter Your New Phone" className="rounded-full bg-[#FFE4BC] px-6 py-5" />
                        </div>

                        {/* Button */}
                        <div className="flex justify-center pt-4">
                            <Button className="px-12 py-6 rounded-full text-lg font-semibold bg-linear-to-b from-[#135491] to-[#001d35] cursor-pointer">
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    </>
}
