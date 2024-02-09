"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Login = ({user}) => {
  const initialValues = {
    email: user?.email || "",
    password: user?.password || ""
}
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialValues);

const handleStateChange = (e) => {
  const {name, value} = e.target;
  setForm({...form, [name]: value});
};

const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);
}
  return (
    <div className='w-full h-1/2 sm:w-[400px] sm:h-[400px] border rounded-lg border-black flex items-center justify-center flex-col gap-4 sm:gap-1'>
        <h2 className='p-2 bg-green-400 w-screen sm:w-full text-center font-bold text-xl rounded-t-lg'>Login here</h2>
        <form className='w-full h-full flex flex-col items-center justify-center gap-5'>
          <input 
            type='text' 
            placeholder='Enter your email address'
             className="p-2 rounded border bg-transparent border-slate-500 outline-none" 
             value={form.email} 
             onChange={handleStateChange}
           />

          <input 
            type='password' 
            placeholder='Enter your password' 
            className="p-2 rounded border bg-transparent border-slate-500 outline-none" 
            value={form.password} 
            onChange={handleStateChange}
          />
            <p className='text-sm'>Don't have an account yet? <Link href="/signup" className='text-md underline'>Sign up</Link></p>

            <button className={`flex items-center justify-center gap-3 px-3 py-2 font-medium rounded text-black 
            ${isSubmitting ? "bg-green-200" : "bg-green-400"}`
            } 
            onClick={handleSubmit}>
          Login
        </button>
        </form>
    </div>
  )
}

export default Login