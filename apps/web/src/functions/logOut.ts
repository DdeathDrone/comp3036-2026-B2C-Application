"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";

export async function logOut(){ //TODO: Finish implementation with backend 
    const cookieStore = await cookies();
   

    /*const response = await fetch(`/api/auth`, {
        method: "DELETE",
    });*/
    cookieStore.delete("auth_token");
    //revalidatePath("/");
    //redirect("/");
    redirect('/');


}