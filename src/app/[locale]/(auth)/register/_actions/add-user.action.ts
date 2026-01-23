'use server'

import { redirect } from "@/i18n/navigation";
import { RegisterFields } from "../_types/register-fields";
import { getLocale } from "next-intl/server";
import { SignUpResponse } from "../_types/api-resoponse";

type AddUserProps = {
  values: RegisterFields;
};

export async function addUser({values}: AddUserProps){
  const locale = await getLocale();
  const res = await fetch(`${process.env.API_URL}/auth/signup`,{
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(
      {
        firstName: values.name.firstName,
        lastName: values.name.lastName,
        email: values.email,
        password: values.password,
        rePassword: values.confirmPassword,
        phone: values.phone,
        gender: values.gender
      }
    )
  });

  const payload: SignUpResponse = await res.json();

  if ('error' in payload) {
    throw new Error( payload.error || 'Failed to create account , try again later !');
  }


  redirect({href: '/login',locale});
  return await res.json();

} 