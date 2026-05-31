import { Order } from "@prisma/client";
import { OrderDetailItem } from "./OrderDetailItem";

export function OrderDetails({order} : {order : Order}){
    return( // TODO: MAKE LOOK BETTER
        <div className="pt-10"> 
            <p>Order from {order.orderDate.toDateString()}</p>
            <p>Total Cost ${order.totalCost}</p>
            <ul>
                {order.OrderItem.length == 0 ? "0 Items" 
                          : order.OrderItem.map((item)=>( 
                            <li key = {item.productId} className="border border-black">
                              {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
                              {<OrderDetailItem orderItem={item}/>}
                            </li>
                        ))}
    </ul></div>
    )
}