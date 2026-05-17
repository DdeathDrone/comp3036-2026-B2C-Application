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
    const user = await jwt.verify(token.value, env.JWT_SECRET);
    console.log(user);
    return <Link className="pl-5 pr-5"href={`/profile/${user.userid}`}>{user.username}</Link>
}