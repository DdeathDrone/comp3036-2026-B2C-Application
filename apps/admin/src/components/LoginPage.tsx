'use client'
import { useActionState } from "react"
import { logIn } from "../functions/logIn";

export function LoginPage(){
    const [state, formAction] = useActionState(logIn, {success: false, error: undefined});
    return <form action={formAction}>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" ></input>
        {state.error && <p style={{color: 'red'}}>{state.error}</p>}
        <div><button name="Sign In">Sign In</button></div>
    </form>
}
