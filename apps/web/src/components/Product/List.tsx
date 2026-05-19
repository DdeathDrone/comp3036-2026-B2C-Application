import type { Product } from "@repo/db/data";
import { ProductListItem } from "./ListItem";

export function ProductList({ products }: { products: Product[] }) {
  return <div className="py-6" aria-label="Product List">
    <ul> {/* If no posts are passed into BlogList, display "0 Posts" else map posts to display */}
      {products.length == 0 ? "0 Products" 
      : products.map((product)=>( 
        <li key = {product.id}>
          {/*post.active ? <BlogListItem post={post}/> : null*/}  {/* If post is active display blogListItem else nothing */}
          {<ProductListItem product={product}/>}
        </li>
      ))}
    </ul></div>;
}

export default ProductList;
