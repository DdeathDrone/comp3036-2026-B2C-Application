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
    return (
    <div className="flex max-w-400 place-content-center">
        <div className="block border mt-5 rounded-md px-5 pb-5 bg-blue-600/50">
            <p className="pt-5 text-xl">Order Total: ${state.totalCost.toFixed(2)}</p>

            <form className="" action={formAction} aria-label="Payment Details Form">
                <div className="">
                    
                    <div className="my-1 ">
                        <label htmlFor="Address">Address:</label>
                        <input className="border ml-14" name="Address" id="Address"  aria-label="Address Field" tabIndex={0}></input>
                    </div>
                    <div className="my-1">
                        <label htmlFor="FirstName" className="">First Name:</label>
                        <input className="border ml-9" name="FirstName" id="FirstName" aria-label="FirstName Field" tabIndex={0}></input>
                    </div>
                    <div className="my-1">
                        <label htmlFor="LastName">Last Name:</label>
                        <input className="border ml-10" name="LastName" id="LastName" aria-label="LastName Field" tabIndex={0}></input>
                    </div>
                    <div className="my-1">
                        <label htmlFor="LastName">Card Number:</label>
                        <input className="border ml-5" name="LastName" id="LastName" aria-label="LastName Field" tabIndex={0}></input>
                    </div>
                </div>
                {state.error && <p style={{color: 'red'}}>{state.error}</p>}
                {!state.res ? <button className="bg-green-400 text-black hover:bg-green-600 border rounded-lg px-4 py-1 mt-2 " aria-label="Pay Button">Pay</button> : 
                <Suspense fallback={<p>Transaction Pending...</p>}><CheckoutComplete res={state.res}/></Suspense> }
                


            </form>
        </div>
    </div>
)}