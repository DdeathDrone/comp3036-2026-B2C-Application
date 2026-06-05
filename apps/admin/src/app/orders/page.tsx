import { LoginPage } from "../../components/LoginPage";
import { OrderHistory } from "../../components/OrderHistory";
import { TopBar } from "../../components/TopBar";
import { getOrders } from "../../functions/getOrders";
import { isLoggedIn } from "../../utils/auth";


export default async function Page() {
  const loggedIn = await isLoggedIn();
  
  if (!loggedIn) {
      return <> <LoginPage></LoginPage></>;
    } else {
        
        const orders = await getOrders();
     return <>      <TopBar></TopBar> <OrderHistory order={orders.message}></OrderHistory></>
    }
}