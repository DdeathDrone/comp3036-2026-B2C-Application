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
    const order = await client.db.order.findFirst({where: {orderId: id}, include: {OrderItem: {include: {Product: {select: {price: true, title: true}}}}, User: {select: {username: true, email: true}}}})
    return <> <TopBar></TopBar> <OrderDetails order={order ? order : []}></OrderDetails></>
  }
}