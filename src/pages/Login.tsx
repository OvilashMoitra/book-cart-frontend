/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginUserMutation } from '../redux/features/user/userApiSlice'
import { Link, useNavigate } from "react-router-dom";

type IUserInputs = {
  email: string
  password: string
}
type ISignupResponse={
  "message": string,
  "token": string,
  "code": number
}


const Login = () => {
  const [token,setToken]=useState<string>('')
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm<IUserInputs>()
  const [login, { isLoading }] = useLoginUserMutation()
  
  if (isLoading) <p>Loading...</p>

  useEffect(() => {
    const isTokenExist=localStorage.getItem('token')
    if (isTokenExist || token) { 
      navigate('/')
    } 
  }, [navigate,token])
  
  

  const onSubmit: SubmitHandler<IUserInputs> = async(data) => {
    try {
      const user =await login(data) as {data:ISignupResponse}
      localStorage.setItem("token", user.data.token)
      setToken(user.data.token)
    } catch (error) {
      console.log("error from login page",error)
    }

  }

  return (
    <div className='flex items-center h-screen'>
    <form onSubmit={handleSubmit(onSubmit)} className='md:w-[550px] w-[90vw] rounded-2xl p-10 mx-auto border-black border-solid border-2'>
      <p>Login</p>
      <input className='block bg-slate-300 w-full p-5 rounded-lg m-3' type="email" {...register("email", { required: true })} placeholder='email'/>
      <input className='block bg-slate-300 w-full p-5 rounded-lg m-3' type="password" {...register("password", { required: true })}  placeholder='password'/>
        <input className='btn btn-sm block mx-auto' type="submit" value="Login" />
      <Link className='mx-auto text-blue-400' to={'/signup'}>Don't have an account? Sign up</Link>
    </form>
  </div>
  )
}

export default Login