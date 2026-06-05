"use client"
export async function getCheckout(){
    const cartCookie = await fetch(`http://localhost:3001/api/cart`, {
        method: "GET",
    })
    if(cartCookie.status == 404){
        return [];
    }
    const cartJson = await cartCookie.json();
    //console.log(cartJson.message);
    return cartJson.message;


}