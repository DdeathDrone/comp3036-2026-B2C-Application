import { OrderDetails } from "@/components/Accounts/OrderDetails";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const id = parseInt(orderId);
  

  return <AppLayout><OrderDetails order={await client.db.order.findFirstOrThrow({where: {orderId: id}, include:{OrderItem: {include: {Product: true}} }})}></OrderDetails></AppLayout>

}
