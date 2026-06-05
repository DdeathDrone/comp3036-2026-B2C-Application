"use client"

import { CheckoutListItem } from "./CheckoutListItem"

export function CheckoutList({cart} : {cart : any[]}){
    if(cart.length == 0) return <p>Cart is empty</p>
    return (<>
    {cart.map((item) => <CheckoutListItem key={item.product.id} product={item.product} quantity={item.ammount}></CheckoutListItem>)}
    </>
)
}