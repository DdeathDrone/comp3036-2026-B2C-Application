'use client'
import { logIn } from "@/functions/logIn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export function LoginForm(){
    const router = useRouter();
    const [state, formAction] = useActionState(logIn, {success: false, error: undefined, router: router});
    return <><form action={formAction} className="pt-10">
        <label className="pr-2" htmlFor="email">Email</label>
        <input className="border " id="email" name="email"></input>
        <label className="pr-2" htmlFor="password">Password</label>
        <input className="border " type="password" id="password" name="password"></input>
        {state.error && <p style={{color: 'red'}}>{state.error}</p>}
        <div><button className="bg-black text-white rounded-2xl py-1 px-2" name="Sign In">Sign In</button></div>
    </form>
    <div><Link href={`/signup`}>Sign Up</Link></div></>
}
