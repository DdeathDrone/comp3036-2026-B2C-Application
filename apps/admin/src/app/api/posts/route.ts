import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

export async function PUT(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const stringid = searchParams.get("id")
    const postid = parseInt(stringid ? stringid : ""); //i love adding extra lines & variables cuz typescript hates me
    const state = searchParams.get("active"); // state will be either something or nothing, nothing means current db value is false, something means true
    const update = await client.db.post.update({where: {id: postid}, data: {active: state ? false : true}}) //if something (db = true) then set db active to false, if nothing (db = false) set db to true
    const response = NextResponse.json(update)
    return response;

}