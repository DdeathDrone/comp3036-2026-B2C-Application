"use server"
import { cookies } from "next/headers";

export async function logIn(state: {success:boolean; error?: string}, formData : FormData) : Promise<{success: boolean; error?: string}> {
    const cookieStore = await cookies();
    const password = formData.get('password') as string;
    if (password == "123"){
        cookieStore.set("auth_token", "true",{httpOnly: true, maxAge: 600}); //TODO: Change max age when needed
        return {success: true};
    }
    return {success: false, error: "Password is incorrect"};

}