import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { makeUrlId } from "../../../functions/makeUrlId";
import { toUrlPath } from "@repo/utils/url";

export async function PATCH(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const stringid = searchParams.get("id")
    const postid = parseInt(stringid ? stringid : ""); //i love adding extra lines & variables cuz typescript hates me
    const state = searchParams.get("active"); // state will be either something or nothing, nothing means current db value is false, something means true
    const update = await client.db.post.update({where: {id: postid}, data: {active: state ? false : true}}) //if something (db = true) then set db active to false, if nothing (db = false) set db to true
    const response = NextResponse.json(update)
    return response;

}

export async function PUT(req: NextRequest){
    const {title, description, content, tags, imageUrl, category} = await req.json();
    //console.log(`${title}, ${description},, ${content}, ${tags}, ${imageUrl}, ${category}`)
    const { searchParams } = new URL(req.url);
    const stringid = searchParams.get("id");
    const pathname = searchParams.get("urlId");
    //console.log(pathname.slice(0, title.length));
    //console.log(pathname?.split("0-"))
    //console.log(toUrlPath(title));
    const postid = parseInt(stringid ? stringid : "");
    var result;
    if(stringid){
        result = await client.db.post.update({
            where: {id: postid}, 
            data: {
                title:title, 
                urlId: ( pathname ? pathname.split("0-")[0] == toUrlPath(title) ? pathname : await makeUrlId(title) : await makeUrlId(title)), 
                description: description, 
                category: category,
                content: content, 
                tags: tags, 
                imageUrl: imageUrl}
        });
    }
    else{
        result = await client.db.post.create({
            data: {
                urlId: await makeUrlId(title),
                title:title, 
                content: content, 
                description: description, 
                imageUrl: imageUrl, 
                date: new Date(),
                category: category,
                views: 0, 
                tags: tags, 
                active: true, 
                }
        });
        
    }
    const response = NextResponse.json({result});
    return response;


}