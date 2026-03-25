import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return (
    <AppLayout>
      <Main posts={posts.filter(post => post.category.toLowerCase() == name)} />
    </AppLayout>
  );
}
