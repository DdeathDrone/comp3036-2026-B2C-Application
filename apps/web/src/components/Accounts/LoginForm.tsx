'use client'
import { logIn } from "@/functions/logIn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export function LoginForm(){
    const router = useRouter();
    const [state, formAction] = useActionState(logIn, {success: false, error: undefined, router: router});
    return (
    <div className="block min-w-100 mt-10 border p-5 rounded-lg">
        <form action={formAction} className="">
            <div className="grid grid-col-2">
                <label className="pr-2" htmlFor="email">Email</label>
                <input className="border px-2 " id="email" name="email"></input>
            </div>
            <div className="grid grid-col-2">
                <label className="pr-2" htmlFor="password">Password</label>
                <input className="border px-2" type="password" id="password" name="password"></input>
            </div>
            {state.error && <p style={{color: 'red'}}>{state.error}</p>}
            <div className="mt-5">
                <button className="bg-blue-300 hover:bg-blue-500 text-black border rounded-md py-1 px-2" name="Log In">Log In</button>
                <Link className="float-right border py-1 px-2 rounded-md text-right text-black border-black bg-red-200 hover:bg-red-300" href={`/signup`}>Sign Up</Link>
            </div>
                

        </form>
        
    </div>
)}
