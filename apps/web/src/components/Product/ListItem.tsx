import type { Product } from "@repo/db/data";
import Image from "next/image";
import Link from "next/link";
import { CartButton } from "./CartButton";

export function ProductListItem({ product }: { product: Product }) {
  
  return (
    <article
      key={product.id}
      className="block h-40 w-350 border-b-2 pt-3 "
      data-test-id={`blog-post-${product.id}`}
      aria-label={product.title}
    >
      {/*<p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p>*/}
      <div className="block w-[200px] float-left mr-10 isolate">
        <Image src={product.imageUrl} alt={product.title} width={200} height={200}/>
      </div>
      <div className="block w-200 float-left mr-10 isolate">
      <Link className="text-xl"href={`/product/${product.urlId}`}>{product.title}</Link>
      
      <p className="">{product.categories}</p>
      <p>{product.description}</p>
      </div>
      <div className="block isolate float-right">
      <p className="text-xl text-right">${product.price.toFixed(2)}</p>
      <CartButton productId={product.id} className="mt-20"></CartButton>
      </div>
    </article>
  );
}

