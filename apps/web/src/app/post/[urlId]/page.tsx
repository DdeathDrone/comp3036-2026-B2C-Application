import { AppLayout } from "@/components/Layout/AppLayout";
//import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { BlogDetail } from "@/components/Blog/Detail";
import { client } from "@repo/db/client";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;
  //const postDetails = posts.filter(post => toUrlPath(post.urlId) == urlId)
  //const postDetails = posts.find((post)=>(post.urlId == urlId))
  const postDetails = await client.db.post.findUnique({where: {urlId: urlId, active:true}, include: {likes: true}});

  return <AppLayout>{postDetails == undefined ? "Article Not found" :<BlogDetail post={postDetails}/>} </AppLayout>;
}
