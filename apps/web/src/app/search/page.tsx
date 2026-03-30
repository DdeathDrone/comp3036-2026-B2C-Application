import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
// moved url path from the handleSearch function to here to pass tests without modifying tests.

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const searchResult = posts.filter(post => post.urlId.includes(toUrlPath(q)))

  return (
    <AppLayout query={q}>
      <Main posts={searchResult.length == 0 ? [] : searchResult} />
    </AppLayout>
  );
}
