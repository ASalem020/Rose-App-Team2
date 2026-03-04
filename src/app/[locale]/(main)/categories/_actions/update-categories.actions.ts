"use server";

import { getToken } from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCategoryAction(id: string, formData: FormData) {
  const jwt = await getToken();

  if (!jwt?.accessToken) {
    redirect("/auth/login");
  }

  const res = await fetch(`${process.env.API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt.accessToken}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();

    if (res.status === 401) {
      redirect("/login");
    }

    // redirect مع query param عشان toast يظهر
    redirect(`/categories?error=${encodeURIComponent(error.error || "Update failed")}`);
  }

  // يحدث صفحة الجدول
  revalidatePath("/categories");

  // redirect مع query param للنجاح
  redirect("/categories?success=true");
}