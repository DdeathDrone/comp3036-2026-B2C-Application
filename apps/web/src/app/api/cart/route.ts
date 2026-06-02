import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest){
    const cookieStore = await cookies();

    const request = await req.json();

    if(!cookieStore.get("cart")){
        const newCart = {cart: [{id: request.id, ammount: request.ammount}]}
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