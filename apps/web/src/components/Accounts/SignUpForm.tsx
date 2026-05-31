"use client"
import { signUp } from "@/functions/signUp";
import { useActionState } from "react";

export function SignUpForm(){
    const [state, formAction] = useActionState(signUp, {success: false, error: undefined});
    return <form action={formAction} className="pt-10">
        <label className="pr-2" htmlFor="email">Email</label>
        <input className="border border-black" id="email" name="email"></input>
        <label className="pr-2" htmlFor="username">Username</label>
        <input className="border border-black" id="username" name="username"></input>
        <label className="pr-2" htmlFor="password">Password</label>
        <input className="border border-black" type="password" id="password" name="password"></input>
        {state.error && <p style={{color: 'red'}}>{state.error}</p>}
        <div><button className="bg-black text-white rounded-2xl py-1 px-2" name="Sign In">Sign In</button></div>
    </form>
}