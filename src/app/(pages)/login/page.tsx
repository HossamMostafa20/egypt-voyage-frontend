import React from 'react'
import LoginForm from './_Component/LoginForm/LoginForm'
import GuestOnlyRoute from "@/components/Protected/GuestOnlyRoute";


export default function Login() {
  return <>
    <div className='min-h-[90vh] flex flex-col justify-center items-center'>
      <GuestOnlyRoute>
        <LoginForm />
      </GuestOnlyRoute>
    </div>
  </>
}
