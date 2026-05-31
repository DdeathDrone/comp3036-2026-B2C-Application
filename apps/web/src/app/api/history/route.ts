import { NextRequest, NextResponse } from "next/server";
import {client} from "@repo/db/client"
import { products } from "@repo/db/data";

export async function GET(req : NextRequest) //TODO: Secure API
{
    const request = await req.json();
    const userId = parseInt(request.userId);

    //const userId = 1;

    //const data = await client.db.product.findMany({where:{history: {some: {userId: userId}}}})
    const data = await client.db.order.findMany({where:{userId: userId}, include:{OrderItem: {include:{Product: true}}}});
    const response = NextResponse.json(data);
    return response;

}