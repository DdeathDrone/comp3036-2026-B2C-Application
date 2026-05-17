import { CheckoutForm } from "./CheckoutForm";

export function Checkout(){
    return (
    <div className="pt-10">
        Checkout:
        <div>
            Cart: 0 Products {/*TODO: Add Cart with backend implementation */}
        </div>
        <CheckoutForm/>
    </div>
    )
}