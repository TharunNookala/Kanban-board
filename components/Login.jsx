"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import FormField from './FormField'
import Button from './Button'

const Login = ({user}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(
    {
        email: user?.email || "",
        password: user?.password || ""
    }
)
const handleStateChange = (fieldName,value) => {
  setForm((prevState)=>({...prevState, [fieldName] : value}))
};

const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  console.log("Login form :", form)
}
  return (
    <div className='w-full h-1/2 sm:w-[400px] sm:h-[400px] border rounded-lg border-black flex items-center justify-center flex-col gap-4 sm:gap-1'>
        <h2 className='p-2 bg-green-400 w-screen sm:w-full text-center font-bold text-xl rounded-t-lg'>Login here</h2>
        <form className='w-full h-full flex flex-col items-center justify-center gap-5'>
        <FormField
            state={form.email}
            placeholder="Enter your email address"
            setState={(value) => handleStateChange('email', value)}
        />
        <FormField
            type="password"
            state={form.password}
            placeholder="Enter your password"
            setState={(value) => handleStateChange('password', value)}
        />
            <p className='text-sm'>Don't have an account yet? <Link href="/signup" className='text-md underline'>Sign up</Link></p>

            <Button title="Login" handleClick={handleSubmit} />
        </form>
    </div>
  )
}

export default Login