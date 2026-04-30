"use server"
import { cookies } from "next/headers";

export async function logIn(state: {success:boolean; error?: string}, formData : FormData) : Promise<{success: boolean; error?: string}> {
    const cookieStore = await cookies();
    const password = formData.get('password') as string;
    /*if (password == "123"){
        cookieStore.set("auth_token", "true",{httpOnly: true, maxAge: 600}); //TODO: Change max age when needed
        return {success: true};
    }*/
    const response = await fetch(`http:/localhost:3002/api/auth`, {
        method: "POST",
        headers: {"Content-Type": "multipart/form-data"},
        body: JSON.stringify(password),
    });
    if(!response.ok){
        return {success: false, error: "Password is incorrect"};
    }
    cookieStore.set("auth_token",await response.json(), {httpOnly: true, secure: true, maxAge: 7*24*60*60, path:'/'})
    return {success: true};
    

}