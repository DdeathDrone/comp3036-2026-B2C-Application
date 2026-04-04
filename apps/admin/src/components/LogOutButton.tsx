'use client'
import { logOut } from "../functions/logOut";

export function LogOutButton(){
    return <button className="bg-red-500 text-white rounded-2xl py-1 px-2"onClick={logOut}>Logout</button>
}