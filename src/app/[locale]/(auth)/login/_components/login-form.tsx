
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoginFields } from '@/lib/types/auth'
import Link from 'next/link'
import { loginSchema } from '@/lib/schemas/auth.schema'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from 'lucide-react'
import useLogin from '../hooks/use-login'
import { FormControl, FormItem, FormLabel, Form, FormField, FormMessage } from '@/components/ui/form'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
    // ^ translation
    const t = useTranslations('pages.login.login-form');

    // ^ Mutation 
    const { error, mutate } = useLogin()

    // ^ react-hook-form
    const form = useForm({
        mode: "onSubmit",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    //   ^ function 
    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        mutate(data)

    }

    return <Form {...form}>
        <form action="" className='max-w-sm w-full' onSubmit={form.handleSubmit(onSubmit)}>
            <div className=' *:w-full space-y-6'>
                <div className='space-y-2'>
                    {/* email input */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('emailLabel')}</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="user@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* password input */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('passwordLabel')}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="user@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* forget password button */}
                    <div className='flex items-center justify-end w-full'>
                        <Link href="/forgot-password" className="text-maroon-700 ">{t('forgotPassword')}</Link>
                    </div>

                    {/* remember me checkbox */}

                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox h-4 w-4 text-maroon-600 border-zinc-300 block" />
                        <span className=" text-zinc-800 block">{t('rememberMe')}</span>
                    </label>

                </div>


                {/* global error message */}
                {error?.message && (
                    <div className=" border border-red-400 text-center p-2">
                        <p className="text-red-400 font-xl">*{error?.message}</p>
                    </div>
                )}

                <Button disabled={form.formState.isSubmitting} className='bg-maroon-600 hover:bg-maroon-800 text-white h-10'>{t('button')}</Button>
            </div>
        </form>
    </Form>

}
