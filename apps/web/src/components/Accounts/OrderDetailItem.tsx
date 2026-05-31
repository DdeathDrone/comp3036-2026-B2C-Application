import { OrderItem } from "@prisma/client";

export function OrderDetailItem({orderItem} : {orderItem : OrderItem}){
      return ( //TODO: MAKE LOOK BETTER
    <article 
      key={orderItem.productId}
      className="pb-5"
      data-test-id={`order-item-${orderItem.productId}`}
    >
        <div className="grid grid-cols-4">
            <p>{orderItem.Product.title}</p>
            <p className="">Item Price ${orderItem.Product.price}</p>
            <p>Ammount purchased {orderItem.ammount}</p>
            <p className="">Total Price ${orderItem.Product.price * orderItem.ammount}</p>

        </div>
      
    </article>
  );
}


