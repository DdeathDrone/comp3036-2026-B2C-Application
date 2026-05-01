import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
//import { posts } from "@repo/db/data";
//import { toUrlPath } from "@repo/utils/url";
import {client} from "@repo/db/client";

export default async function Page({
    params,
}: {
    params: Promise<{ tag: string }>;
}) {
    const { tag } = await params;
    const postsInTag = await client.db.post.findMany({where: {tags: { contains: tag}}, include:{likes: true}});
    /*
    const postsInTag = posts
    .filter(post => post.tags
        .split(",").find((t)=> toUrlPath(t) == tag) == undefined ? false : true
    )
    */
    return (
        <AppLayout>
            <Main posts={postsInTag.length == 0 ? [] : postsInTag}/>
        </AppLayout>
    );
}