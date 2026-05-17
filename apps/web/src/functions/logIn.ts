"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { env } from "@repo/env/web";

export async function logIn(state: {success:boolean; error?: string}, formData : FormData) : Promise<{success: boolean; error?: string}> {
    const cookieStore = await cookies();
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
   
    if(password == "123" && username =="user"){
        const sessionToken = jwt.sign(
            {logged: true, role: "user", username: username},
            env.JWT_SECRET,
            {expiresIn: '15m'}
        );
        cookieStore.set("auth_token", sessionToken, {httpOnly: true, secure: true, maxAge: 7*24*60*60, path:'/'})

        
    }

   /*
    const response = await fetch(`/api/auth`, {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: JSON.stringify(password),
    });
    if(!response.ok){
        return {success: false, error: "Password is incorrect"};
    }*/
    return redirect('/');
    //return {success: true};
    

}