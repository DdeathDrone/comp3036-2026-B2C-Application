import { AppLayout } from "@/components/Layout/AppLayout";
//import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { ProductDetail } from "@/components/Product/Detail";
import { client } from "@repo/db/client";
import { products } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;
  //const postDetails = posts.filter(post => toUrlPath(post.urlId) == urlId)
  const postDetails = products.find((p)=>(p.urlId == urlId))
  //const postDetails = await client.db.post.findUnique({where: {urlId: urlId, active:true}, include: {likes: true}});

  return <AppLayout>{postDetails == undefined ? "Article Not found" :<ProductDetail product={postDetails}/>} </AppLayout>;
}
