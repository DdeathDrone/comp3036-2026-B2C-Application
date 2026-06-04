import { Product, Order } from "@repo/db/data";
import { HistoryListItem } from "./HistoryListItem";

export function PurchaseHistory({order} : {order: Order[]}){
    return (
    <div> 
        <h2 className="text-lg pb-3">Purchase History</h2>
        <ul>
        {order.length == 0 ? "0 Purchases" 
          : order.map((o)=>( 
            <li key = {o.orderId} className="">
              {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
              {<HistoryListItem order={o}/>}
            </li>
            ))}
    </ul></div>
    )
}