import { NextRequest, NextResponse } from "next/server";
import {client} from "@repo/db/client"
import jwt from "jsonwebtoken";
import { env } from "@repo/env/web";
import { cookies } from "next/headers";
import { isLoggedIn } from "../../../utils/auth";

export async function GET(req : NextRequest)
{
    //const request = await req.json();
    //const userId = parseInt(request.userId);
    //const token = await req.cookies.get("auth_token");
    // const cookieStore = await cookies();

    // const token = await isLoggedIn();
    // console.log(token);
    
    // if(!token) return NextResponse.json({message: "Unauthorised Access"},{status:401});
    // try{
    //       const user = await jwt.verify(token.value, env.JWT_SECRET) as jwt.JwtPayload; 
    //       console.log(user);
    //       if(user?.role != "admin") return NextResponse.json({message: "Unauthorised Access"},{status:401});
    //     }
    // catch (err){
    //     return NextResponse.json({message: "Unauthorised Access"},{status:401});
    // }
    
    //const userId = 1;

    //const data = await client.db.product.findMany({where:{history: {some: {userId: userId}}}})
    const data = await client.db.order.findMany({include:{User: {select: {username: true, email: true} }, OrderItem: {include:{Product: {select: {title: true, price: true}}}}}});
    const response = NextResponse.json({message: data}, {status: 200});
    return response;

}