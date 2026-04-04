import { posts } from "@repo/db/data";
export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;
  const postDetails = posts.find((post)=>(post.urlId == urlId))
  return <p>{postDetails?.title}</p>
}