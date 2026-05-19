import type { Product } from "@repo/db/data";
import Image from "next/image";
import Link from "next/link";

export function ProductListItem({ product }: { product: Product }) {
  
  /*const date = Intl.DateTimeFormat("en-US", 
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).formatToParts(product.date);
  */
  return (
    <article
      key={product.id}
      className="pb-5"
      data-test-id={`blog-post-${product.id}`}
      aria-label={product.title}
    >
      {/*<p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p>*/}
      <Link className="text-xl"href={`/product/${product.urlId}`}>{product.title}</Link>
      <Image src={product.imageUrl} alt={product.title} width={300} height={300}/>
      <p className="">{product.categories}</p>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/*<p>#{post.tags.replace(",", " #")}</p>
      <p>{post.views} views {post.likes.length} likes</p>*/}
    </article>
  );
}

