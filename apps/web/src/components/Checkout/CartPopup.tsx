"use client"
import { useEffect } from "react";
import { useCartContext } from "./CartPopupContext";

export function CartPopup(){
    const context = useCartContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            context?.clearCartPopup()
        }, 5000) 
    }, [context?.isOpen]
    );

    return context?.isOpen ? <div className="text-center">Added to Cart!</div> : null; //TODO: Make Pretty


}