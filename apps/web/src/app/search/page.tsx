import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const searchResult = posts.filter(post => post.urlId.includes(q))

  return (
    <AppLayout query={q}>
      <Main posts={searchResult.length == 0 ? [] : searchResult} />
    </AppLayout>
  );
}
