import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";
import { products } from "@repo/db/data";
//import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
// moved url path from the handleSearch function to here to pass tests without modifying tests.

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  //const searchResult = posts.filter(post => post.urlId.includes(toUrlPath(q)))
  //const searchResult = products.filter(p => p.urlId.includes(toUrlPath(q)) && p.active == true)
  const searchResult = await client.db.product.findMany({where: {urlId: {contains: toUrlPath(q)}, active:true}});

  return (
    <AppLayout query={q}>
      <Main products={searchResult.length == 0 ? [] : searchResult} />
    </AppLayout>
  );
}
