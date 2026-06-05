import { OrderDetails } from "@/components/Accounts/OrderDetails";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
import { isLoggedIn } from "../../../../../../utils/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string, userid: string }>;
}) {
  const { orderId, userid } = await params;
  const id = parseInt(orderId);
  const uid = parseInt(userid);
  
  const user = await isLoggedIn();
  if(!user || user?.userid != uid) return redirect("/")
  return <AppLayout><OrderDetails order={await client.db.order.findFirstOrThrow({where: {orderId: id}, include:{OrderItem: {include: {Product: true}} }})}></OrderDetails></AppLayout>

}
