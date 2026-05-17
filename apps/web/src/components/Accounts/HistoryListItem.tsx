import { Product } from "@repo/db/data";

export function HistoryListItem({ product }: { product: Product }) {
  
  return (
    <article
      key={product.id}
      className="pb-5"
      data-test-id={`blog-post-${product.id}`}
    >
      <p>{product.title}</p>
      <p className="">{product.categories}</p>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/*<p>#{post.tags.replace(",", " #")}</p>
      <p>{post.views} views {post.likes.length} likes</p>*/}
    </article>
  );
}

