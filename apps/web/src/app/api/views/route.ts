import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    const {searchParams} = new URL(req.url);
    const urlId = searchParams.get("urlId");
    const result = await client.db.post.update({where: {urlId: urlId ? urlId : " "}, data:{views:{increment:1}}});
    const response = NextResponse.json(result);
    return response;
}