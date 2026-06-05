"use client"

import { CheckoutListItem } from "./CheckoutListItem"

export function CheckoutList({cart} : {cart : any[]}){
    if(cart.length == 0) return <p>Cart is empty</p>
    var total = 0;
    for(const c of cart){
        total += c.product.price * c.ammount
    }
    return (<>
    {cart.map((item) => <CheckoutListItem key={item.product.id} product={item.product} quantity={item.ammount}></CheckoutListItem>)}
    <p className="pt-5 text-xl">Order Total: ${total.toFixed(2)}</p>
    </>
)
}