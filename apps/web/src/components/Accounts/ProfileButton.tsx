"use server"
import { env } from "@repo/env/web";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function ProfileButton(){
    const cookie = await cookies();
    const token = cookie.get("auth_token");

    if(!token){
        redirect("/");
    }
    try{
        const user = await jwt.verify(token.value, env.JWT_SECRET) as jwt.JwtPayload; //TODO: Move to API when implementing backend
        return <Link className="pl-5 pr-5"href={`/profile/${user.userid}`}>{user.username}</Link>
    }
    catch (err){
        console.error('Token invalid');
    }
}