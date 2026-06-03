"use client"

import { useRouter } from "next/navigation";

export function CartButton({productId, className} : {productId: number, className?: string}){
    const router = useRouter();
    return <button aria-label="Add to Cart Button" className={"bg-black text-white rounded-2xl py-1 px-2 "  + className} data-test-id="cart-button" 
    onClick={async () => {
        const update = await fetch(`/api/cart`,{
            method:"PUT",
            body: JSON.stringify({id: productId, ammount: 1}),
        });
        
        router.refresh();
        
    }}
    >Add to Cart</button>
}