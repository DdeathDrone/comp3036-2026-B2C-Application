import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { categories } from "@/functions/categories";
import { client } from "@repo/db/client";
import { toUrlPath } from "@repo/utils/url";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  //TODO: come back to this, might be better solution
  //const posts = await client.db.post.findMany({where:{category:{ contains:name  }, active:true}, include:{likes:true}}); //reduces size of data called from database
  //const postsInCategory = posts.filter(post => post.category.toLowerCase() == name) //filters to the explicit value of the category, ensuring categories with similar names are not conflated
  //const posts= await client.db.post.findMany({where: {tags: { contains: tag.split(/-| /gmi)[0]}, active:true}, include:{likes: true}}); //reduces size of data called from database
  const productsInCategory = await client.db.product.findMany({where: {categories: {contains: name.replace("-", " "), mode:"insensitive"}, active:true}});

  /*const productsInCategory = products //filters to the explicit value of the tags, ensuring tags with similar names are not conflated
      .filter(p => p.categories
          .split(",").find((t)=> toUrlPath(t) == name) == undefined ? false : true
      )*/
  return (
    <AppLayout selected={name}>
      <Main products={productsInCategory.length == 0 ? [] : productsInCategory} />
    </AppLayout>
  );
}
