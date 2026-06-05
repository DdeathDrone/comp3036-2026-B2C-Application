"use client"

import { useRouter } from "next/navigation";
import { useCartContext } from "../Checkout/CartPopupContext";

export function CartButton({productId, className} : {productId: number, className?: string}){
    const router = useRouter();
    const context = useCartContext();
    return <button aria-label="Add to Cart Button" className={"bg-blue-200 hover:bg-blue-300 border text-black rounded-md py-1 px-2 "  + className} data-test-id="cart-button" 
    onClick={async () => {
        const update = await fetch(`/api/cart`,{
            method:"PUT",
            body: JSON.stringify({id: productId, ammount: 1}),
        });
        context?.triggerCartPopup();
        router.refresh();
        
    }}
    >Add to Cart</button>
}