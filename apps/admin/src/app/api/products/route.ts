import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";
import { makeUrlId } from "../../../functions/makeUrlId";
import { toUrlPath } from "@repo/utils/url";

export async function PATCH(req: NextRequest){
    const { searchParams } = new URL(req.url);
    const stringid = searchParams.get("id")
    const productid = parseInt(stringid ? stringid : ""); //i love adding extra lines & variables cuz typescript hates me
    const state = searchParams.get("active"); // state will be either something or nothing, nothing means current db value is false, something means true
    const update = await client.db.product.update({where: {id: productid}, data: {active: state ? false : true}}) //if something (db = true) then set db active to false, if nothing (db = false) set db to true
    const response = NextResponse.json(update)
    return response;

}

export async function PUT(req: NextRequest){
    const {Title, Description, Content, ImageUrl, Categories, Stock, Price} = await req.json();
    const { searchParams } = new URL(req.url);
    const stringid = searchParams.get("id");
    const pathname = searchParams.get("urlId");
  
    const productid = parseInt(stringid ? stringid : "");
    var result;
    if(stringid){
        result = await client.db.product.update({
            where: {id: productid}, 
            data: {
                title:Title, 
                //urlId: ( pathname ? pathname.split("0-")[0] == toUrlPath(Title) ? pathname : await makeUrlId(Title) : await makeUrlId(Title)), 
                //Unique UrlID feature removed because thats what tests wanted, error will now be thrown if u have the same title as another user.
                urlId: toUrlPath(Title),
                description: Description, 
                categories: Categories,
                content: Content, 
                imageUrl: ImageUrl,
                stock: parseInt(Stock),
                price: parseFloat(Price),
            }
        });
    }
    else{
        result = await client.db.product.create({
            data: {
                //urlId: await makeUrlId(Title),
                urlId: toUrlPath(Title),
                title:Title, 
                content: Content, 
                description: Description, 
                imageUrl: ImageUrl, 
                date: new Date(),
                categories: Categories,
                active: true, 
                price: Price,
                stock: Stock,
                }
        });
        
    }
    const response = NextResponse.json({result});
    return response;


}