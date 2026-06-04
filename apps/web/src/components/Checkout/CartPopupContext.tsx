"use client"
import { createContext, useState, useContext, PropsWithChildren } from "react";


interface CartPopupProps{
    isOpen: boolean,
    triggerCartPopup: () => void,
    clearCartPopup: () => void,
}
const CartPopupContext = createContext<CartPopupProps | undefined>(undefined)

export const useCartContext = () => {
    return useContext(CartPopupContext);

}
export const CartPopupProvider = ({children}: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerCartPopup = () => setIsOpen(true);
    const clearCartPopup = () => setIsOpen(false);
    return (
        <CartPopupContext.Provider value={{isOpen, triggerCartPopup, clearCartPopup}}>
            {children}
        </CartPopupContext.Provider>
    )
}