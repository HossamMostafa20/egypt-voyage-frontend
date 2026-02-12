"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { sendRegisterData } from '@/services/authServices';
import { schema } from '@/schema/registerSchema'
import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'


export default function SignUpForm() {

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const router = useRouter();

    const { handleSubmit, register, formState: { errors, touchedFields } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(schema),
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })

    async function signUp(userData) {
        try {
            setLoading(true);
            const response = await sendRegisterData(userData);
            // console.log(response);
            if (response?.token) {
                router.push("/login");
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
            <form onSubmit={handleSubmit(signUp)} className="p-5 sm:p-8 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-linear-to-b from-[#e7cfa6] to-[#d29b52] border-0">
                {/* Title */}
                <h1 className='text-4xl text-center text-[#0D3B66] font-bold mb-6'>Sign Up</h1>
                {/* Name */}
                <div className="space-y-0.5 mb-2">
                    <div className='flex items-center'>
                        <Label className="text-lg ms-1.5">Name</Label>
                        {errors.name && touchedFields.name && <p className="text-red-500 text-sm ms-7">{errors.name?.message}</p>}
                    </div>
                    <Input type="text" placeholder="Enter your name" {...register('name')} className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Email */}
                <div className="space-y-0.5 mb-2">
                    <div className='flex items-center'>
                        <Label className="text-lg ms-1.5">Email</Label>
                        {errors.email && touchedFields.email && <p className="text-red-500 text-sm mt-1 ms-9">{errors.email?.message}</p>}
                    </div>
                    <Input type="email" placeholder="Enter your email" {...register('email')} className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Password */}
                <div className="space-y-0.5 mb-2">
                    <div className='flex items-center'>
                        <Label className="text-lg ms-1.5">Password</Label>
                        {errors.password && touchedFields.password && <p className="text-red-500 text-sm mt-1 ms-9">{errors.password?.message}</p>}
                    </div>
                    <Input type="password" placeholder="Enter your password" {...register('password')} className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>
                <div className="space-y-0.5 mb-7 mt-3">
                    <Label className="text-lg ms-1.5">Confirm Password</Label>
                    <Input type="password" placeholder="Rewrite your password" {...register('rePassword')} className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                    {errors.rePassword && touchedFields.rePassword && <p className="text-red-500 text-sm mt-1.5 ms-3">{errors.rePassword?.message}</p>}
                </div>

                {/* Button */}
                <Button disabled={loading} type="submit" className="w-full h-12 rounded-2xl text-2xl font-semibold bg-linear-to-b from-[#184e77] to-[#021d33] cursor-pointer">
                    {loading ?
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" />
                        </span>
                        :
                        "Sign up"
                    }
                </Button>

                {apiError && <span className='block text-center text-red-500 mt-3.5'>{apiError}</span>}

                {/* Signup */}
                <p className="text-center mt-3">
                    Have an account?{" "}
                    <Link href={'/login'} className="text-[#123a63] font-medium hover:underline">Log in</Link>
                </p>
            </form>
        </div>
    </>
}
