import { Profile } from "@/components/Accounts/Profile";
import { AppLayout } from "@/components/Layout/AppLayout";
//import { user1 } from "@repo/db/data";
import {client} from "@repo/db/client";
import { isLoggedIn } from "../../../../utils/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const { userid } = await params;
  const id = parseInt(userid);
  

  const user = await isLoggedIn();
  if(user?.userid != id) return redirect("/login")
  return <AppLayout><Profile user={await client.db.user.findFirstOrThrow({where: {userId: id}, include:{Order: true}})}></Profile></AppLayout>

}
