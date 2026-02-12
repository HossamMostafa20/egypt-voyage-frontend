"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendLoginData } from '@/services/authServices';
import { schema } from '@/schema/loginSchema'
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'


export default function LoginForm() {

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const router = useRouter();

    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    async function Login(userData) {
        try {
            setLoading(true);
            const response = await sendLoginData(userData);
            // console.log(response);
            if (response?.token) {
                // localStorage.setItem('token' , response.token);
                router.push("/");
            } else {
                setApiError(response.message)
            };
        } finally {
            setLoading(false);
        };
    };

    // console.log('errors', errors);

    return <>
        <div className='p-0 sm:p-5'>
            <form onSubmit={handleSubmit(Login)} className="p-5 sm:p-8 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-linear-to-b from-[#e7cfa6] to-[#d29b52] border-0">
                {/* Title */}
                <h1 className='text-4xl text-center text-[#0D3B66] font-bold mb-6'>Welcome Back !</h1>

                {/* Email */}
                <div className="space-y-1 mb-5">
                    <Label className="text-lg ms-1">Email</Label>
                    <Input type="email" placeholder="Enter your email" {...register('email')} className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    {errors.email && touchedFields.email && <p className="text-red-500 text-sm mt-1 ms-9">{errors.email?.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1 mb-4">
                    <Label className="text-lg ms-1">Password</Label>
                    <Input type="password" placeholder="Enter your password" {...register('password')} className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    {errors.password && touchedFields.password && <p className="text-red-500 text-sm mt-1 ms-9">{errors.password?.message}</p>}
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-end mb-4 text-sm">
                    {/* <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>remember me</span>
                    </div> */}
                    <Link href={''} className="text-[#123a63] hover:underline">forget password?</Link>
                </div>

                {/* Button */}
                <Button disabled={loading} type="submit" className="w-full h-12 rounded-2xl text-2xl font-semibold bg-linear-to-b from-[#184e77] to-[#021d33] shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:opacity-90 cursor-pointer">
                    {loading ?
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" />
                        </span>
                        :
                        "Login"
                    }
                </Button>

                {apiError && <span className='block text-center text-red-500 mt-3.5'>{apiError}</span>}

                {/* Signup */}
                <p className="text-center mt-5">
                    Don’t have an account?{" "}
                    <Link href={'/signup'} className="text-[#123a63] font-medium hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    </>
}
