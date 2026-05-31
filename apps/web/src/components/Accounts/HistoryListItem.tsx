import { Order, Product } from "@repo/db/data";
import Link from "next/link";

export function HistoryListItem({ order }: { order: Order }) {
  
  return (
    <article 
      key={order.orderId}
      className="pb-5"
      data-test-id={`order-list-${order.orderId}`}
    >
      <p>{order.orderDate.toDateString()}</p>
      <p className="">{order.totalCost}</p>
      <Link href={`/profile/${order.userId}/order-details/${order.orderId}`}> View Details</Link>
    </article>
  );
}

