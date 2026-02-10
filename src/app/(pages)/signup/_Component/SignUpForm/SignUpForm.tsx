"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export default function SignUpForm() {

    // const router = useRouter();

    // const [form, setForm] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    // });


    // const [loading, setLoading] = useState(false);

    // const submit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     if (form.password !== form.confirmPassword) {
    //         alert("Passwords do not match");
    //         return;
    //     }

    //     try {
    //         setLoading(true);

    //         const res = await fetch("/api/auth/register", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(form),
    //         });

    //         if (!res.ok) {
    //             const err = await res.json();
    //             throw new Error(err.message);
    //         }

    //         router.push("/dashboard");


    //     } catch (err: any) {
    //         alert(err.message);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // };


    // const submit = async (e: FormEvent) => {
    //     e.preventDefault();

    //     await fetch("https://unpolishable-arboresque-geri.ngrok-free.dev/api/Auth/register", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(form),
    //     });

    //     router.push("/dashboard");
    // };

    return <>
        <div className='p-0 sm:p-5'>
            <form className="p-5 sm:p-8 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-linear-to-b from-[#e7cfa6] to-[#d29b52] border-0">
                {/* Title */}
                <h1 className='text-4xl text-center text-[#0D3B66] font-bold mb-6'>Sign Up</h1>
                {/* Name */}
                <div className="space-y-0.5 mb-2">
                    <Label className="text-lg ms-1.5">Name</Label>
                    <Input type="text" placeholder="Enter your name" className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Email */}
                <div className="space-y-0.5 mb-2">
                    <Label className="text-lg ms-1.5">Email</Label>
                    <Input type="email" placeholder="Enter your email" className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Password */}
                <div className="space-y-0.5 mb-2">
                    <Label className="text-lg ms-1.5">Password</Label>
                    <Input type="password" placeholder="Enter your password" className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
                <div className="space-y-0.5 mb-7">
                    <Label className="text-lg ms-1.5">Confirm Password</Label>
                    <Input type="password" placeholder="Rewrite your password" className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Button */}
                <Button type='submit' className="w-full h-12 rounded-2xl text-2xl font-semibold bg-linear-to-b from-[#184e77] to-[#021d33] shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:opacity-90 cursor-pointer">
                    Sign up
                </Button>

                {/* Signup */}
                <p className="text-center mt-4">
                    Have an account?{" "}
                    <Link href={'/login'} className="text-[#123a63] font-medium hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    </>
}
