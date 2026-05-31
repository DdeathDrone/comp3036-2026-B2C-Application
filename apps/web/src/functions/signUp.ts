"use client"

import { redirect } from "next/navigation";

export async function signUp(state: {success:boolean; error?: string}, formData : FormData) : Promise<{success: boolean; error?: string}> {
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
   
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return {success: false, error:"Invalid Email"};
    if(password.length < 12) return {success: false, error:"Password must be at least 12 characters long"};
    if(username.length == 0) return {success: false, error:"Username is required"};

    const res = await fetch("/api/auth",{
        method: "PUT",
        headers: {"Content-Type": "multipart/form-data"},
        body: JSON.stringify(Object.fromEntries(formData)),
    }); 
    if(!res.ok){
        return {success: false, error: "Error adding account, please try again later"}
    }
    return redirect("/login");

}