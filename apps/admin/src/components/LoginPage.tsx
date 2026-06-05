'use client'
import { useActionState } from "react"
import { logIn } from "../functions/logIn";

export function LoginPage(){
    const [state, formAction] = useActionState(logIn, {success: false, error: undefined});
    return (
    <div className="flex place-content-center">
        <div className="block mt-20 p-5 border rounded-xl">
            <main className="">Sign in to your account</main>
            <form action={formAction}>
                <div className="grid mt-2">
                    <label className="pr-2" htmlFor="password">Password</label>
                    <input className="border border-black" type="password" id="password" name="password" aria-label="Password Input"></input>
                </div>
                {state.error && <p style={{color: 'red'}}>{state.error}</p>}
                <div><button className="bg-blue-200 hover:bg-blue-400 border mt-5 rounded-md py-1 px-2" name="Sign In">Sign In</button></div>
            </form>
        </div>
    </div>
)}
