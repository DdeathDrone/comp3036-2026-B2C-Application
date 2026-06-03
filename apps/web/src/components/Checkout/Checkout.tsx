"use client"
import { getCheckout } from "@/functions/getCheckout";
import { CheckoutForm } from "./CheckoutForm";
import {use, Suspense} from "react";
import { CheckoutList } from "./CheckoutList";

const cart = getCheckout().then((result) => {return result}).catch((err) => {console.log(err); return []});

function CheckoutPromise({cart} : {cart : Promise<Array<Object>>}){
    const cartContent = use(cart);
    return <CheckoutList cart={cartContent}/>;
}

export function Checkout(){
    return (
    <div className="pt-10">
        Checkout:
        
        <Suspense fallback={<p>Loading cart...</p>}>
            <CheckoutPromise cart={cart}></CheckoutPromise>{/*TODO: Add Cart with backend implementation */}
        </Suspense>
        
        <CheckoutForm/>
    </div>
    )
}