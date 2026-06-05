import { Order } from "@repo/db/data";
import Link from "next/link";

export function OrderHistoryItem({order} : {order: Order}){

    const orderDate = new Date(order.orderDate);
    const mins = orderDate.getMinutes() < 10 ? "0" + orderDate.getMinutes()  : orderDate.getMinutes();
    const date = (
    orderDate.getDate() +"/"+ (orderDate.getMonth()+1) +"/"+ orderDate.getFullYear() + "    " + 
    (orderDate.getHours() > 12 ? orderDate.getHours() - 12 + ":" + mins + " PM" 
    :
    orderDate.getHours() == 0 ? "12" + ":" + mins + " AM" : orderDate.getHours() + ":" + mins + " AM"
    ) 
  )
  
  return (
    <article 
      key={order.orderId}
      className="min-w-200 max-w-400 h-10 mt-3 border-b"
      data-test-id={`order-list-${order.orderId}`}
    >
        <div className="float-left w-1/5">
            <p className="">{order.User?.username}</p>
        </div>
        <div className="float-left w-2/5">
            <p>{date}</p>
        </div>
        <div className="float-left w-1/5">
            <p className="">${order.totalCost.toFixed(2)}</p>
        </div>
        
        <div className="float-right text-right w-1/5 text-blue-700">
            <Link href={`/orders/order-details/${order.orderId}`}> View Details</Link>
        </div>
    </article>
  );
}


