import { Product } from "@repo/db/data";
import { HistoryListItem } from "./HistoryListItem";

export function PurchaseHistory({products} : {products: Product[]}){
    return (
    <div> 
        Purchase History
        <ul>
        {products.length == 0 ? "0 Purchases" 
          : products.map((product)=>( 
            <li key = {product.id} className="border border-black">
              {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
              {<HistoryListItem product={product}/>}
            </li>
            ))}
    </ul></div>
    )
}