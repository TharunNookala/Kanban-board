"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
  const router = useRouter();
  const initialValues = {
    email:  "",
    password:  ""
}
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

const handleStateChange = (e) => {
  const {name, value} = e.target;
  setForm({...form, [name]: value});
  setErrors(validate({ ...form, [name]: value }));
};

const validate = (values) => {
  const errors = {};
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(!values.email){
    errors.email = "Email is required"
  }
  else if(!regex.test(values.email)){
    errors.email = "Enter a valid email address"
  }

  if(!values.password){
    errors.password = "Password is required"
  }
  return errors;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try{
    await axios.post("http://localhost:8000/login"),{
      email: form.email,
      password: form.password,
    }
    if (response.status===200) {   
      console.log('Logged in successfully', response);   
    }
  }
  catch(err) {
    console.log(err)
  }
  finally{
    setIsSubmitting(false);
    setForm(initialValues);
  }
  router.push('/dashboard')
}
  return (
    <div className='w-full h-1/2 sm:w-[400px] sm:h-[400px] border rounded-lg border-black flex items-center justify-center flex-col gap-4 sm:gap-1'>
        <h2 className='p-2 bg-green-400 w-screen sm:w-full text-center font-bold text-xl rounded-t-lg'>Login here</h2>
        <form action='POST' className='w-full h-full flex flex-col items-center justify-center gap-5'>
        <div className='flex flex-col items-start justify-center gap-1'>
          <input 
            type='text'
            name='email'
            placeholder='Enter your email address'
             className="p-2 rounded border bg-transparent border-slate-500 outline-none" 
             value={form.email} 
             onChange={handleStateChange}
           />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className='flex flex-col items-start justify-center gap-1'>
          <input 
            type='password'
            name='password'
            placeholder='Enter your password' 
            className="p-2 rounded border bg-transparent border-slate-500 outline-none" 
            value={form.password} 
            onChange={handleStateChange}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
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