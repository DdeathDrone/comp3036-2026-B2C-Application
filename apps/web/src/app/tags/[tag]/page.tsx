import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { tags } from "@/functions/tags";
//import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import {client} from "@repo/db/client";

export default async function Page({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;
    //TODO: find better solution
    const posts= await client.db.post.findMany({where: {tags: { contains: tag.split(/-| /gmi)[0]}, active:true}, include:{likes: true}}); //reduces size of data called from database
    
    const postsInTag = posts //filters to the explicit value of the tags, ensuring tags with similar names are not conflated
    .filter(post => post.tags
        .split(",").find((t)=> toUrlPath(t) == tag) == undefined ? false : true
    )
    
    return (
        <AppLayout>
            <Main posts={postsInTag.length == 0 ? [] : postsInTag}/>
        </AppLayout>
    );
}