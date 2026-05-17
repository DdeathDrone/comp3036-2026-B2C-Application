import { Profile } from "@/components/Accounts/Profile";
import { AppLayout } from "@/components/Layout/AppLayout";
import { user1 } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return <AppLayout><Profile user={user1}></Profile></AppLayout>

}
