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
  //TODO: come back to this, might be better solution
  const posts = await client.db.post.findMany({where:{category:{ contains:name  }, active:true}, include:{likes:true}}); //reduces size of data called from database
  const postsInCategory = posts.filter(post => post.category.toLowerCase() == name) //filters to the explicit value of the category, ensuring categories with similar names are not conflated

  return (
    <AppLayout>
      <Main posts={postsInCategory.length == 0 ? [] : postsInCategory} />
    </AppLayout>
  );
}
