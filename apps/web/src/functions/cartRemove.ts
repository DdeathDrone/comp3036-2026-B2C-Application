import { redirect, RedirectType } from "next/navigation"


export async function cartRemove(id : number){
    const res = await fetch(`/api/cart`,{
        method: "DELETE",
        body: JSON.stringify({id: id}),
    })
    window.location.reload();
    //redirect(`/checkout`);
    return res;
}