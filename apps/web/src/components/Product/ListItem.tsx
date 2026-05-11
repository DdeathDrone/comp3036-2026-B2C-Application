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
      className="flex flex-row gap-8"
      data-test-id={`blog-post-${product.id}`}
    >
      {/*<p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p>*/}
      <p>{product.categories}</p>
      <Image src={product.imageUrl} alt={"image"} width={400} height={300}/>
      <Link href={`/post/${product.urlId}`}>{product.title}</Link>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/*<p>#{post.tags.replace(",", " #")}</p>
      <p>{post.views} views {post.likes.length} likes</p>*/}
    </article>
  );
}

