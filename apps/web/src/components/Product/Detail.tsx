import type { Product } from "@repo/db/data";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./LikeButton";

export async function ProductDetail({ product }: { product: Product }) {
  const content = await marked.parse(product.content);
  /*const update = await fetch(`http://localhost:3001/api/views?urlId=${product.urlId}`,{
    method:"PATCH",
  });

  const date = Intl.DateTimeFormat("en-US", 
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).formatToParts(product.date);*/

  return <article data-test-id={`blog-post-${product.id}`}> {/*TODO: adjust test id */}  
    <Link href={`/post/${product.urlId}`}>{product.title}</Link>
     {/*<p>{product[2]?.value + " " + product[0]?.value + " " + product[4]?.value } </p> */}
     <p> {product.categories}</p>
    <Image src={product.imageUrl} alt={"image"} width={500} height={400}/>
    <div data-test-id="content-markdown" dangerouslySetInnerHTML={{ __html: content}}></div>
    {/*<p>#{product.tags.replace(",", " #")}</p>
    <p>{product.views+1} views {product.likes.length} likes</p>*/}
    <LikeButton postid={product.id}></LikeButton>
  </article>;
}
