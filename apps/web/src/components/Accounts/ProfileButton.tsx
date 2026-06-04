"use server"
import { env } from "@repo/env/web";
import { isLoggedIn } from "../../../utils/auth";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function ProfileButton(){
    const cookie = await cookies();
    const token = cookie.get("auth_token");

    const user = await isLoggedIn();
    return <Link className="pl-5 pr-5"href={`/profile/${user?.userid}`}>{user?.username}</Link>
    
}