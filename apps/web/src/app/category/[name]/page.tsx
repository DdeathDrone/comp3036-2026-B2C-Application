import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";
//import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  //const postsInCategory = posts.filter(post => post.category.toLowerCase() == name)
  const postsInCategory = await client.db.post.findMany({where:{category:{ contains:name  }}, include:{likes:true}}); //TODO: come back to this, might be better solution

  return (
    <AppLayout>
      <Main posts={postsInCategory.length == 0 ? [] : postsInCategory} />
    </AppLayout>
  );
}
