import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const {year, month} = await params;
  const postsInDate = posts.filter(post => String(post.date.getMonth()+1) === month && String(post.date.getFullYear()) === year);
  return (
    <AppLayout>
      <Main posts={postsInDate.length == 0 ? [] : postsInDate} />
    </AppLayout>
  );
}
