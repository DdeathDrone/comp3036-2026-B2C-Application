import { OrderDetails } from "@/components/Accounts/OrderDetails";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
import { isLoggedIn } from "../../../../../../utils/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const id = parseInt(orderId);
  
  const user = await isLoggedIn();
  if(!user || user?.userid != id) return redirect("/")
  return <AppLayout><OrderDetails order={await client.db.order.findFirstOrThrow({where: {orderId: id}, include:{OrderItem: {include: {Product: true}} }})}></OrderDetails></AppLayout>

}
