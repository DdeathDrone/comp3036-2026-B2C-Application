'use client'
import { useActionState } from "react"
import { logIn } from "../functions/logIn";

export function LoginPage(){
    const [state, formAction] = useActionState(logIn, {success: false, error: undefined});
    return <form action={formAction}>
        <label className="pr-2"htmlFor="password">Password</label>
        <input className="border border-black "type="password" name="password" ></input>
        {state.error && <p style={{color: 'red'}}>{state.error}</p>}
        <div><button className="bg-black text-white rounded-2xl py-1 px-2" name="Sign In">Sign In</button></div>
    </form>
}
