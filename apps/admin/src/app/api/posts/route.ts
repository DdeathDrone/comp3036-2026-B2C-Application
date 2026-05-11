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
    const {Title, Description, Content, Tags, ImageUrl, Category} = await req.json();
    const { searchParams } = new URL(req.url);
    const stringid = searchParams.get("id");
    const pathname = searchParams.get("urlId");
  
    const postid = parseInt(stringid ? stringid : "");
    var result;
    if(stringid){
        result = await client.db.post.update({
            where: {id: postid}, 
            data: {
                title:Title, 
                //urlId: ( pathname ? pathname.split("0-")[0] == toUrlPath(Title) ? pathname : await makeUrlId(Title) : await makeUrlId(Title)), 
                //Unique UrlID feature removed because thats what tests wanted, error will now be thrown if u have the same title as another user.
                urlId: toUrlPath(Title),
                description: Description, 
                category: Category,
                content: Content, 
                tags: Tags, 
                imageUrl: ImageUrl}
        });
    }
    else{
        result = await client.db.post.create({
            data: {
                //urlId: await makeUrlId(Title),
                urlId: toUrlPath(Title),
                title:Title, 
                content: Content, 
                description: Description, 
                imageUrl: ImageUrl, 
                date: new Date(),
                category: Category,
                views: 0, 
                tags: Tags, 
                active: true, 
                }
        });
        
    }
    const response = NextResponse.json({result});
    return response;


}