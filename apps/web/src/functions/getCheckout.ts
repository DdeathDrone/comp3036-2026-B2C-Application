"use client"
export async function getCheckout(){
    const cartCookie = await fetch(`http://localhost:3001/api/cart`, {
        method: "GET",
    })
    
    const cartJson = await cartCookie.json();
    //console.log(cartJson.message);
    return cartJson.message;


}