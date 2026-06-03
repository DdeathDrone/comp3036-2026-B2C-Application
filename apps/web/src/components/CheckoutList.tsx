"use client"

import { ProductListItem } from "./Product/ListItem"

export function CheckoutList({cart} : {cart : any[]}){
    if(cart.length == 0) return <p>Cart is empty</p>
    return <>{cart.map((item) => <div><ProductListItem key={item.product.id} product={item.product}></ProductListItem> Quantity: {item.ammount} Total Price {item.ammount * item.product.price}</div>)}</>
}