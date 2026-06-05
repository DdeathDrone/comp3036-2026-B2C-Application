import { Product, Order } from "@repo/db/data";
import { HistoryListItem } from "./HistoryListItem";

export function PurchaseHistory({order} : {order: Order[]}){
    return (
    <div className="border rounded-lg px-5 pt-3 pb-5"> 
      <h2 className="text-xl pb-3">Purchase History</h2>
      <div>
        <div className="flex min-w-200 max-w-400 text-lg border-b">
          <div className="float-left w-2/4">
            Purchase Date
          </div>
          <div className="float-left w-1/4">
            Total Cost
          </div>
        </div>
      
        <ul>
        {order.length == 0 ? "0 Purchases" 
          : order.map((o)=>( 
            <li key = {o.orderId} className="">
              {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
              {<HistoryListItem order={o}/>}
            </li>
            ))}
            
        </ul>
      </div>
    </div>
    )
}