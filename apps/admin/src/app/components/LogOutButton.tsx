'use client'
import { logOut } from "../functions/logOut";

export function LogOutButton(){
    return <button onClick={logOut}>LogOut</button>
}