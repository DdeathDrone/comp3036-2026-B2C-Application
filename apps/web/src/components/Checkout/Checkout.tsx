"use client"
import { getCheckout } from "@/functions/getCheckout";
import { CheckoutForm } from "./CheckoutForm";
import {use, Suspense} from "react";
import { CheckoutList } from "./CheckoutList";




function CheckoutPromise({cart, user} : {cart : Promise<Array<any>>, user: number}){
    const cartContent = use(cart);
    var total = 0;
    for(const c of cartContent){
        total += c.product.price * c.ammount
    }
    return (<>
    <CheckoutList cart={cartContent}/>
    {cartContent.length == 0 ? null : <CheckoutForm user={user} totalCost={total}/>}</>);
}

export function Checkout({user} : {user: number}){
    const cart = getCheckout().then((result) => {return result}).catch((err) => {console.log(err); return []});;
    
    return (
    <div className="pt-10">
        Checkout:
        
        <Suspense fallback={<p>Loading cart...</p>}>
            <CheckoutPromise user={user} cart={cart}></CheckoutPromise>
            
        </Suspense>
        
        
    </div>
    )
}