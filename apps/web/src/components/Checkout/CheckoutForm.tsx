import { handleCheckout } from "@/functions/handleCheckout";
import { redirect } from "next/navigation";
import { Suspense, use, useActionState } from "react";
import { useDeleteCookie } from "cookies-next";

function CheckoutComplete({res} : {res : Promise<any>}){
    const deleteCookie = useDeleteCookie();
    const content = use(res);
    return (<>
    <p>Transaction Successful</p> {deleteCookie("cart") } {setTimeout(() => redirect("/"),5000)} </> //TODO: FIX THE RANDOM NUMBER
)
}

export function CheckoutForm({user, totalCost} : {user: number; totalCost: number}){
    const [state, formAction] = useActionState(handleCheckout, {success: false, error: undefined, userId: user, totalCost: totalCost});
    return <form className="grid grid-cols-4 w-150" action={formAction} aria-label="Payment Details Form">
        <label htmlFor="Address">Address:</label>
        <input className="border border-black col-span-3 mb-3" name="Address" id="Address"  aria-label="Address Field" tabIndex={0}></input>
        <label htmlFor="FirstName">First Name:</label>
        <input className="border border-black mr-5" name="FirstName" id="FirstName" aria-label="FirstName Field" tabIndex={0}></input>
        <label htmlFor="LastName">Last Name:</label>
        <input className="border border-black " name="LastName" id="LastName" aria-label="LastName Field" tabIndex={0}></input>
        {state.error && <p style={{color: 'red'}}>{state.error}</p>}
        {!state.res ? <button className="bg-green-500 rounded-2xl px-2 py-1 mt-2 " aria-label="Pay Button">Pay</button> : 
        <Suspense fallback={<p>Transaction Pending...</p>}><CheckoutComplete res={state.res}/></Suspense> }
        


    </form>
}