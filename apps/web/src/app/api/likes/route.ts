import { client } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    const userIp = req.headers.get("X-Forwarded-For");
    const {searchParams} = new URL(req.url);
    const postId = searchParams.get("id");
    if(userIp && postId){ 
        const postLikes = await client.db.like.findMany({where: {postId: parseInt(postId), userIP: userIp}});
        if(postLikes.length == 0){
            const create = await client.db.like.create({data: {userIP: userIp, postId: parseInt(postId)}})
            return NextResponse.json({create}, {status: 200});
        }
        const del = await client.db.like.delete({where: {postId_userIP: {postId: parseInt(postId), userIP: userIp}}});
        return NextResponse.json({del}, {status: 200});
    };
    return NextResponse.json({message: "IP or PostID could not be found"}, {status: 404 });

}

