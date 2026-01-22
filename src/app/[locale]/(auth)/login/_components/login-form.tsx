
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoginFields } from '@/lib/types/auth'
import Link from 'next/link'
import { loginSchema } from '@/lib/schemas/auth.schema'
import {SubmitHandler , useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from 'lucide-react'
import useLogin from '../hooks/use-login'



export default function LoginForm() {
    const { error , mutate} = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

   //   ^ function 
  const onSubmit: SubmitHandler<LoginFields> = (data)=> {
    mutate(data)
    
  }


  return <form action="" className=' max-w-sm w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className=' *:w-full space-y-6'>
                <div className='space-y-2'>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} type="email" id='email' placeholder='user@example.com' className='h-12 border-2 border-zinc-300 ' autoCapitalize='email'/>
                        {errors.email ? (
                            <p className="text-red-400 font-sm">
                            *{errors?.email?.message as string}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} type="password" id='password' placeholder='*****' className='h-12 border-2 border-zinc-300 ' autoComplete='current-password'/>
                        {errors.password ? (
                            <p className="text-red-400 font-sm  aria-invalid:border-destructive">
                            *{errors?.password?.message as string}
                            </p>
                        ) : (
                            ""
                        )}
                    </div>

                    <div className='flex items-center justify-end w-full'>
                        <Link href="/forget-password" className="text-maroon-700 ">Forgot your password ?</Link>
                    </div>
                </div>
                {error?.message && (
                    <div className=" border border-red-400 text-center p-2">
                        <p className="text-red-400 font-xl">*{error?.message}</p>
                    </div>
                )}
                <Button disabled={isSubmitting} className='bg-maroon-600 hover:bg-maroon-800 text-white h-10'>{isSubmitting ? <LoaderCircle /> : "Login"}</Button>
            </div>
    </form>
  
  
 
}
