import { client } from "@repo/db/client";
import { LoginPage } from "../../../../components/LoginPage";
import { isLoggedIn } from "../../../../utils/auth";
import { TopBar } from "../../../../components/TopBar";
import { OrderDetails } from "../../../../components/OrderDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ orderid: string }>;
}) {
  const loggedIn = await isLoggedIn();
  const {orderid} = await params;
  const id = parseInt(orderid);
  
  if (!loggedIn) {
      return <><LoginPage></LoginPage></>;
  }
  else{
    return <> <TopBar></TopBar> <OrderDetails order={await client.db.order.findFirstOrThrow({where: {orderId: id}, include: {User: true, OrderItem: {include: {Product: true}}}})}></OrderDetails></>
  }
}