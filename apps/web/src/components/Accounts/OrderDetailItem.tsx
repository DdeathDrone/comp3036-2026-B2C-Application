import { OrderItem } from "@repo/db/data";

export function OrderDetailItem({orderItem} : {orderItem : OrderItem}){
      return ( //TODO: MAKE LOOK BETTER
    <article 
      key={orderItem.productId}
      className="min-w-200 max-w-400 h-10 mt-3 border-b"
      data-test-id={`order-item-${orderItem.productId}`}
    >
        <div className="">
          <div className="w-1/4 float-left">
            <p>{orderItem.Product?.title}</p>
          </div>
          <div className="w-1/4 float-left text-center">
            <p className="">${orderItem.Product?.price.toFixed(2)}</p>
          </div>
          <div className="w-1/4 float-left text-center">
            <p data-test-id="item-ammount">{orderItem.ammount}</p>
          </div>
          <div className="w-1/4 float-right text-right">
            <p className="">${(orderItem.Product?.price ? orderItem.Product.price * orderItem.ammount : 0).toFixed(2)}</p>
          </div>

        </div>
      
    </article>
  );
}


