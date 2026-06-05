"use client";
import { Order, Product } from "@repo/db/data";
import Link from "next/link";

export function HistoryListItem({ order }: { order: Order }) {
  const mins = order.orderDate.getMinutes() < 10 ? "0" + order.orderDate.getMinutes()  : order.orderDate.getMinutes();
  const date = (
    order.orderDate.getDate() +"/"+ (order.orderDate.getMonth()+1) +"/"+ order.orderDate.getFullYear() + "    " + 
    (order.orderDate.getHours() > 12 ? order.orderDate.getHours() - 12 + ":" + mins + " PM" 
    :
    order.orderDate.getHours() == 0 ? "12" + ":" + mins + " AM" : order.orderDate.getHours() + ":" + mins + " AM"
    ) 
  )
  
  return (
    <article 
      key={order.orderId}
      className="min-w-200 max-w-400 h-10 mt-3 border-b"
      data-test-id={`order-list-${order.orderId}`}
    >
      <div className="float-left w-2/4">
        <p>{date}</p>
      </div>
      <div className="float-left w-1/4">
        <p className="">Total Cost: ${order.totalCost.toFixed(2)}</p>
      </div>
      <div className="float-right text-right w-1/4 text-blue-700">
        <Link href={`/profile/${order.userId}/order-details/${order.orderId}`}> View Details</Link>
      </div>
    </article>
  );
}

