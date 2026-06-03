import { redirect } from "next/navigation"


export async function cartRemove(id : number){
    const res = await fetch(`/api/cart`,{
        method: "DELETE",
        body: JSON.stringify(id),
    })
    redirect("/checkout");
}