"use client"
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { env } from "@repo/env/web";

export async function logIn(state: {success:boolean; error?: string, router?: any}, formData : FormData) : Promise<{success: boolean; error?: string, router?:any}> {
    const password = formData.get('password') as string;
    const email = formData.get('email') as string;
   
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) return {success: false, error:"Invalid Email", router: state.router};
    /*if(password == "123" && username =="user"){
        const sessionToken = jwt.sign(
            {logged: true, role: "user", username: username, userid: 1},
            env.JWT_SECRET,
            {expiresIn: '15m'}
        );
        cookieStore.set("auth_token", sessionToken, {httpOnly: true, secure: true, maxAge: 7*24*60*60, path:'/'})

        
    }*/

   
    const response = await fetch(`/api/auth`, {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: JSON.stringify(Object.fromEntries(formData)),
    });
    if(!response.ok){
        const json = await response.json()
        return {success: false, error: json.message, router: state.router};
    }
    console.log(state);
    //state.router.back();
    state.router.refresh();
    //return redirect('/');
    return {success: true};
    

}