import { Checkout } from "@/components/Checkout/Checkout";
import { AppLayout } from "@/components/Layout/AppLayout";
import { getCheckout } from "@/functions/getCheckout";
import { client } from "@repo/db/client";

export default async function Page(){
    /*const res = await fetch(`http://localhost:3001/api/cart`, {
        method: "GET",
    })
    //console.log(res);
    if(res.status == 404){
        return <AppLayout><Checkout cart={[]} products={[]}/></AppLayout>
    }
    const cartJson = await res.json()
    
    const cart = cartJson.message.cart;
    
    const products = await client.db.product.findMany({where: {id: {in: cart.id}}})*/
    
    return <AppLayout><Checkout/></AppLayout>
}