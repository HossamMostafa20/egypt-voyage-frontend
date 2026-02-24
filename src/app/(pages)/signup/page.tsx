import React from 'react'
import SignUpForm from './_Component/SignUpForm/SignUpForm'
import GuestOnlyRoute from "@/components/Protected/GuestOnlyRoute";

export default function SignUp() {
  return <>
    <div className='min-h-[90vh] flex flex-col justify-center items-center'>
      <GuestOnlyRoute>
        <SignUpForm />
      </GuestOnlyRoute>
    </div>
  </>
}
