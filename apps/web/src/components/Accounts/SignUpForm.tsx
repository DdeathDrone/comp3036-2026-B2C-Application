"use client"
import { signUp } from "@/functions/signUp";
import { useActionState } from "react";

export function SignUpForm(){
    const [state, formAction] = useActionState(signUp, {success: false, error: undefined});
    return (
    <div className="block min-w-100 mt-10 border p-5 rounded-lg">
        <form action={formAction} className="">
            <div className="grid grid-col-2">
                <label className="pr-2" htmlFor="email">Email</label>
                <input className="border border-black" id="email" name="email"></input>
            </div>
            <div className="grid grid-col-2">
                <label className="pr-2" htmlFor="username">Username</label>
                <input className="border border-black" id="username" name="username"></input>
            </div>
            <div className="grid grid-col-2">
                <label className="pr-2" htmlFor="password">Password</label>
                <input className="border border-black" type="password" id="password" name="password"></input>
            </div>
            {state.error && <p style={{color: 'red'}}>{state.error}</p>}
            <div className="mt-5">
                <button className="bg-blue-300 hover:bg-blue-500 text-black border rounded-md py-1 px-2" name="Sign In">Sign In</button>
            </div>
        </form>
    </div>
)}