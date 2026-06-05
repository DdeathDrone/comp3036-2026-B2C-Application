import { Order } from "@repo/db/data";
import { OrderDetailItem } from "./OrderDetailItem";

export function OrderDetails({order} : {order : Order}){
    const mins = order.orderDate.getMinutes() < 10 ? "0" + order.orderDate.getMinutes()  : order.orderDate.getMinutes();
    const date = (
        order.orderDate.getDate() +"/"+ (order.orderDate.getMonth()+1) +"/"+ order.orderDate.getFullYear() + "    " + 
        (
            order.orderDate.getHours() > 12 ? order.orderDate.getHours() - 12 + ":" + mins + " PM" 
            :
            order.orderDate.getHours() == 0 ? "12" + ":" + mins + " AM" : order.orderDate.getHours() + ":" + mins + " AM"
        ) 
  )
    return( // TODO: MAKE LOOK BETTER
        <div className="pt-10"> 
            <p className="text-lg pb-4">Order from {date}</p>
            
            <ul>
                {order.OrderItem?.length == 0 ? "0 Items" 
                          : order.OrderItem?.map((item)=>( 
                            <li key = {item.productId} className="">
                              {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
                              {<OrderDetailItem orderItem={item}/>}
                            </li>
                        ))}
    </ul>
    <p>Total Cost: ${order.totalCost.toFixed(2)}</p>
    </div>
    )
}