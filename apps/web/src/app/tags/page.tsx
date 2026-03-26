import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
    params,
}: {
    params: Promise<{tag : string}>;
}) {
    const { tag } = await params;
    const postsInTag = posts.filter(post => tag == post.tags )
    return (
        <AppLayout>
            <Main posts={postsInTag.length == 0 ? [] : postsInTag}/>
        </AppLayout>
    );
}