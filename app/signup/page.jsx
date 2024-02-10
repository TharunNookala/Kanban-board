"use client"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Link from 'next/link'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import axios from "axios";

const Signup = () => {
  const router = useRouter();
  const initialValues = {
    email: "",
    password:  "",
    confirmPassword: ""
}
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

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
  else if(values.password.length < 8){
    errors.password = "Password must be minimum 8 characters"
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}
    
    const handleSubmit =async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        const response = await axios.post("http://localhost:8000/api/v1/users", form);
  
        if (response.status===200) {   
          console.log('Form submitted successfully');
          
        } else {
          console.error('Failed to submit form');
        }
      } catch (error) {
        console.error('Failed to submit form:', error);
      } finally {
        setIsSubmitting(false);
        setHidePassword(true)
        setHideConfirmPassword(true)
        setForm(initialValues);
      }
      router.push('/');
    }
  return (
    <section className='w-screen h-screen flex flex-col items-center justify-start gap-10'>
        <h1 className="text-sm w-full text-center sm:text-3xl sm:font-bold mt-10">
        Welcome to Kanban Board
      </h1>
    <div className='w-[400px] h-[400px] border rounded-lg border-black flex items-center justify-center flex-col'>
        <h2 className='p-2 bg-green-400 w-full text-center font-bold text-xl rounded-t-lg'>Signup here</h2>
        <form action="POST" className='w-full h-full flex flex-col items-center justify-center gap-5'>
          <div className='flex flex-col items-start justify-center gap-1'>
          
            <input 
               type='text'
               name='email'
               placeholder='Enter your email address'
               className="p-2 rounded mr-5 border bg-transparent border-slate-500 outline-none" 
               value={form.email} 
               onChange={handleStateChange}
              />
              
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
           </div>

           <div className='flex flex-col items-start justify-center gap-1'>
           <div className="flex items-center justify-center gap-2">
            <input 
              type={hidePassword ? 'password' : 'text'}
              name='password'
              placeholder='Enter your password' 
              className="p-2 rounded border bg-transparent border-slate-500 outline-none" 
              value={form.password} 
              onChange={handleStateChange}
              />
              <button type="button" onClick={()=>setHidePassword(p=>!p)}>{hidePassword ?<IoEyeOff /> : <IoEye />}</button> 
            </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className='flex flex-col items-start justify-center gap-1'>
          <div className="flex items-center justify-center gap-2">
            <input 
              type={hideConfirmPassword ? 'password' : 'text'}
              name='confirmPassword'
              placeholder='Confirm password' 
              className="p-2 rounded border bg-transparent border-slate-500 outline-none" 
              value={form.confirmPassword} 
              onChange={handleStateChange}
            />
            <button type="button" onClick={()=>setHideConfirmPassword(p=>!p)}>{hideConfirmPassword ?<IoEyeOff /> : <IoEye />}</button> 
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>

        <p className='text-sm'>Already have an account yet? <Link href="/" className='text-md underline'>Login</Link></p>    
        <button className={`flex items-center justify-center gap-3 px-3 py-2 font-medium rounded text-black 
            ${isSubmitting ? "bg-green-200" : "bg-green-400"}`
            } 
            onClick={handleSubmit}>
          Signup
        </button>
        </form>
    </div>
    </section>
  )
}

export default Signup