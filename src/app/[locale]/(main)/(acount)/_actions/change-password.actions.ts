'use server'
import { getToken } from "@/lib/utils/get-token";

// ^ change password server
export async function changePasswordAction(data : {password: string, newPassword: string}) {
 const jwt = await getToken()
  const res = await fetch(`${process.env.API_URL}/auth/change-password`,{
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${jwt?.accessToken}`,
    },
    body: JSON.stringify(
      {
        password: data.password,
        newPassword: data.newPassword,
      }
    )
  });
  const payload = await res.json()
  return payload;
} 