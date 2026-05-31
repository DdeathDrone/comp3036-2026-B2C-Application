import { Product, Order } from "@repo/db/data";
import { HistoryListItem } from "./HistoryListItem";

export function PurchaseHistory({order} : {order: Order[]}){
    return (
    <div> 
        Purchase History
        <ul>
        {order.length == 0 ? "0 Purchases" 
          : order.map((o)=>( 
            <li key = {o.orderId} className="border border-black">
              {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
              {<HistoryListItem order={o}/>}
            </li>
            ))}
    </ul></div>
    )
}