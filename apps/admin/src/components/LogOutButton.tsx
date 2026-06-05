'use client'
import { logOut } from "../functions/logOut";

export function LogOutButton(){
    return <button className="bg-red-300 hover:bg-red-400 rounded-lg border py-1 px-2 mb-2"onClick={logOut}>Logout</button>
}