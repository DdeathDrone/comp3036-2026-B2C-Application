"use client"


import { redirect } from "next/navigation";

export async function logOut(){ //TODO: Finish implementation with backend 
   

    const response = await fetch(`/api/auth`, {
        method: "DELETE",
    });
    redirect('/');


}