import { Order } from "@repo/db/data";
import { OrderDetailsItem } from "./OrderDetailsItem";

export function OrderDetails({order} : {order : Order}){
    const orderDate = new Date(order.orderDate);
    const mins = orderDate.getMinutes() < 10 ? "0" + orderDate.getMinutes()  : orderDate.getMinutes();
    const date = (
    orderDate.getDate() +"/"+ (orderDate.getMonth()+1) +"/"+ orderDate.getFullYear() + "    " + 
    (orderDate.getHours() > 12 ? orderDate.getHours() - 12 + ":" + mins + " PM" 
    :
    orderDate.getHours() == 0 ? "12" + ":" + mins + " AM" : orderDate.getHours() + ":" + mins + " AM"
    ) 
  )
    return( // TODO: MAKE LOOK BETTER
        <div className="flex place-content-center">
            <div className="block mt-5 p-5 rounded-lg border"> 
                <p className="text-xl pb-4">Order from {date} by {order.User?.username}</p>
                <div className="flex min-w-200 max-w-400 text-lg border-b mt-2">
                    <div className="float-left w-1/4">
                        Product Name
                    </div>
                    <div className="float-left w-1/4 text-center">
                        Individual Price
                    </div>
                    <div className="float-left w-1/4 text-center">
                        Ammount Purchased
                    </div>
                    <div className="float-right text-right w-1/4">
                        Total Price
                    </div>
                </div>  
                <ul>
                    {order.OrderItem?.length == 0 ? "0 Items" 
                            : order.OrderItem?.map((item)=>( 
                                <li key = {item.productId} className="">
                                {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
                                {<OrderDetailsItem orderItem={item}/>}
                                </li>
                            ))}
        </ul>
        <p>Total Cost: ${order.totalCost.toFixed(2)}</p>
        <p className="mt-1">Delivery Address: {order.deliveryAddress}</p>
        <p className="mt-1">Recipient First Name: {order.recipientFirstName}</p>
        <p className="mt-1">Recipient Surname: {order.recipientSurname}</p>

        </div>
    </div>
    )
}