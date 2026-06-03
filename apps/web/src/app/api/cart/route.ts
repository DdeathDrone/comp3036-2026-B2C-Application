import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { client } from "@repo/db/client";

export async function PUT(req: NextRequest){ //TODO: Secure API
    const cookieStore = await cookies();

    const request = await req.json();

    if(!cookieStore.get("cart")){
        const newCart = {cart: [ {id: request.id, ammount: request.ammount}]}
        const res = NextResponse.json({body: newCart, status: 200})
        res.cookies.set("cart", encodeURIComponent(JSON.stringify(newCart)));
        return res;
    }
    else{
        const currentCart = JSON.parse(decodeURIComponent(cookieStore.get("cart")?.value as string));
        //const newjson = {cart: [{id: 1, ammount: 2}, {id:2, ammount: 1}]}
        const item = currentCart["cart"].find(({id}) => id == request.id);
        if(item) {
            item.ammount += 1;
        }
        else{
            currentCart["cart"].push({id: request.id, ammount: request.ammount});
        }
        const res = NextResponse.json({body: currentCart, status: 200})
        res.cookies.set("cart", encodeURIComponent(JSON.stringify(currentCart)));
        return res;
        
    }

    

}

export async function GET(req: NextRequest){
    const cookieStore = await cookies();

    const cart = cookieStore.get("cart");

    if(!cart){
        const res = NextResponse.json({message: "Cart is empty",},{ status: 404});
        return res;
    }
    const parsed = JSON.parse(decodeURIComponent(cart.value));
    //console.log(parsed.cart);
    const message = parsed.cart;
    const cartIds = message.map((item: { id: any; }) => item.id);
    const cartAmmounts = message.map((item: { ammount: any; }) => item.ammount);
    
    const products = await client.db.product.findMany({where: {id: {in: cartIds}}})
    var result = []
    for(var i = 0; i < products.length; i++){
        //console.log(message.find(({id}) => id == 1));
        result.push({product: products[i], ammount: message.find(({id}) => id == products[i].id).ammount});
    }
    const res = NextResponse.json({message: result, status: 200});
    return res;
}

export async function DELETE(req : NextRequest){
    const cookieStore = await cookies();

    const request = await req.json();
    //console.log(request.id);
    const cart = cookieStore.get("cart");

    if(!cart){
        const res = NextResponse.json({message: "Cart is empty"},{ status: 404});
        return res;
    }
    const parsed = JSON.parse(decodeURIComponent(cart.value));
    const result = {cart:  parsed.cart.filter(({id}) => id != request.id)};
    console.log(result);


    const res = NextResponse.json({body: result}, {status:200});
    res.cookies.set("cart", encodeURIComponent(JSON.stringify(result)));
    return res;
}

export async function PATCH(req : NextRequest){
    const cookieStore = await cookies();

    const request = await req.json();
    //console.log(request.id);
    const cart = cookieStore.get("cart");

    if(!cart){
        const res = NextResponse.json({message: "Cart is empty"},{ status: 404});
        return res;
    }
    const parsed = JSON.parse(decodeURIComponent(cart.value));

    parsed.cart.find(({id}) => id == request.id).ammount = request.ammount;

    const res = NextResponse.json({message: parsed}, {status: 200});
    res.cookies.set("cart", encodeURIComponent(JSON.stringify(parsed)));
    return res;

}