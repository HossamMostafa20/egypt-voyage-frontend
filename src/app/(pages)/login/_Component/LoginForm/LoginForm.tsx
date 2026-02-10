"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
    return <>
        <div className="p-0 sm:p-5">
            <div className="p-5 sm:p-8 rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.45)] bg-linear-to-b from-[#e7cfa6] to-[#d29b52] border-0">
                {/* Title */}
                <h1 className='text-4xl text-center text-[#0D3B66] font-bold mb-8'>Welcome Back !</h1>

                {/* Email */}
                <div className="space-y-1 mb-5">
                    <Label className="text-lg ms-1">Email</Label>
                    <Input type="email" placeholder="Enter your email" className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
                </div>

                {/* Password */}
                <div className="space-y-1 mb-4">
                    <Label className="text-lg ms-1">Password</Label>
                    <Input type="password" placeholder="Enter your password" className="w-80 h-11 rounded-full bg-[#e6cda6] border-0 shadow-[0_6px_12px_rgba(0,0,0,0.35)] placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0" />
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
                <Button className="w-full h-12 rounded-2xl text-2xl font-semibold bg-linear-to-b from-[#184e77] to-[#021d33] shadow-[0_10px_20px_rgba(0,0,0,0.5)] hover:opacity-90 cursor-pointer">
                    Login
                </Button>

                {/* Signup */}
                <p className="text-center mt-5">
                    Don’t have an account?{" "}
                    <Link href={'/signup'} className="text-[#123a63] font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    </>
}

// "use client"

// import * as React from "react"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Controller, useForm } from "react-hook-form"
// import { toast } from "sonner"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     Field,
//     FieldDescription,
//     FieldError,
//     FieldGroup,
//     FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import {
//     InputGroup,
//     InputGroupAddon,
//     InputGroupText,
//     InputGroupTextarea,
// } from "@/components/ui/input-group"

// const formSchema = z.object({
//     title: z
//         .string()
//         .min(5, "Bug title must be at least 5 characters.")
//         .max(32, "Bug title must be at most 32 characters."),
//     description: z
//         .string()
//         .min(20, "Description must be at least 20 characters.")
//         .max(100, "Description must be at most 100 characters."),
// })

// export function LoginForm() {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             title: "",
//             description: "",
//         },
//     })

//     function onSubmit(data: z.infer<typeof formSchema>) {
//         toast("You submitted the following values:", {
//             description: (
//                 <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
//                     <code>{JSON.stringify(data, null, 2)}</code>
//                 </pre>
//             ),
//             position: "bottom-right",
//             classNames: {
//                 content: "flex flex-col gap-2",
//             },
//             style: {
//                 "--border-radius": "calc(var(--radius)  + 4px)",
//             } as React.CSSProperties,
//         })
//     }

//     return (
//         <Card className="w-full sm:max-w-md">
//             <CardHeader>
//                 <CardTitle>Bug Report</CardTitle>
//                 <CardDescription>
//                     Help us improve by reporting bugs you encounter.
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
//                     <FieldGroup>
//                         <Controller
//                             name="title"
//                             control={form.control}
//                             render={({ field, fieldState }) => (
//                                 <Field data-invalid={fieldState.invalid}>
//                                     <FieldLabel htmlFor="form-rhf-demo-title">
//                                         Bug Title
//                                     </FieldLabel>
//                                     <Input
//                                         {...field}
//                                         id="form-rhf-demo-title"
//                                         aria-invalid={fieldState.invalid}
//                                         placeholder="Login button not working on mobile"
//                                         autoComplete="off"
//                                     />
//                                     {fieldState.invalid && (
//                                         <FieldError errors={[fieldState.error]} />
//                                     )}
//                                 </Field>
//                             )}
//                         />
//                         <Controller
//                             name="description"
//                             control={form.control}
//                             render={({ field, fieldState }) => (
//                                 <Field data-invalid={fieldState.invalid}>
//                                     <FieldLabel htmlFor="form-rhf-demo-description">
//                                         Description
//                                     </FieldLabel>
//                                     <InputGroup>
//                                         <InputGroupTextarea
//                                             {...field}
//                                             id="form-rhf-demo-description"
//                                             placeholder="I'm having an issue with the login button on mobile."
//                                             rows={6}
//                                             className="min-h-24 resize-none"
//                                             aria-invalid={fieldState.invalid}
//                                         />
//                                         <InputGroupAddon align="block-end">
//                                             <InputGroupText className="tabular-nums">
//                                                 {field.value.length}/100 characters
//                                             </InputGroupText>
//                                         </InputGroupAddon>
//                                     </InputGroup>
//                                     <FieldDescription>
//                                         Include steps to reproduce, expected behavior, and what
//                                         actually happened.
//                                     </FieldDescription>
//                                     {fieldState.invalid && (
//                                         <FieldError errors={[fieldState.error]} />
//                                     )}
//                                 </Field>
//                             )}
//                         />
//                     </FieldGroup>
//                 </form>
//             </CardContent>
//             <CardFooter>
//                 <Field orientation="horizontal">
//                     <Button type="button" variant="outline" onClick={() => form.reset()}>
//                         Reset
//                     </Button>
//                     <Button type="submit" form="form-rhf-demo">
//                         Submit
//                     </Button>
//                 </Field>
//             </CardFooter>
//         </Card>
//     )
// }
