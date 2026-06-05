import { NextRequest, NextResponse } from "next/server";
import {client} from "@repo/db/client"
import jwt from "jsonwebtoken";
import { env } from "@repo/env/web";

export async function GET(req : NextRequest)
{
    const request = await req.json();
    const userId = parseInt(request.userId);
    const token = req.cookies.get("auth_token")
    
    if(!token) return NextResponse.json({message: "Unauthorised Access"},{status:401});
    try{
          const user = await jwt.verify(token.value, env.JWT_SECRET) as jwt.JwtPayload; //TODO: Move to API when implementing backend
          if(user?.role != "admin" || user?.userid != userId) return NextResponse.json({message: "Unauthorised Access"},{status:401});
        }
    catch (err){
        return NextResponse.json({message: "Unauthorised Access"},{status:401});
    }
    
    //const userId = 1;

    //const data = await client.db.product.findMany({where:{history: {some: {userId: userId}}}})
    const data = await client.db.order.findMany({where:{userId: userId}, include:{OrderItem: {include:{Product: true}}}});
    const response = NextResponse.json(data);
    return response;

}