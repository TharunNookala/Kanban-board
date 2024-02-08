"use client"
import Button from '@/components/Button'
import FormField from '@/components/FormField'
import Link from 'next/link'
import React, { useState } from 'react'

const Signup = ({user}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState(
        {
            email: user?.email || "",
            password: user?.password || "",
            confirmPassword: user?.confirmPassword || "",
        }
    )
    const handleStateChange = (fieldName,value) => {
      setForm((prevState)=>({...prevState, [fieldName] : value}))
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      console.log("Signup form :", form)
    }
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-start gap-10'>
        <h1 className="text-sm w-full text-center sm:text-3xl sm:font-bold mt-10">
        Welcome to Kanban Board
      </h1>
    <div className='w-[400px] h-[400px] border rounded-lg border-black flex items-center justify-center flex-col'>
        <h2 className='p-2 bg-green-400 w-full text-center font-bold text-xl rounded-t-lg'>Signup here</h2>
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
        <FormField
            type="password"
            state={form.confirmPassword}
            placeholder="Confirm your password"
            setState={(value) => handleStateChange('confirmPassword', value)}
        />
        <p className='text-sm'>Already have an account yet? <Link href="/" className='text-md underline'>Login</Link></p>    
        <Button title="Signup" handleClick={handleSubmit} />
        </form>
    </div>
    </section>
  )
}

export default Signup