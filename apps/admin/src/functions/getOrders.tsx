"use server"
export async function getOrders(){
    const res = await fetch(`https://comp3036-2026-b2-c-application-admi.vercel.app/api/history`, {method: "GET", credentials: `same-origin`})
    const parsed = await res.json();
    return parsed;
}