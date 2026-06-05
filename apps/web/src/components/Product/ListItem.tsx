import type { Product } from "@repo/db/data";
import Image from "next/image";
import Link from "next/link";
import { CartButton } from "./CartButton";

export function ProductListItem({ product }: { product: Product }) {
  
  return (
    <div className="flex place-content-center">
      <article
        key={product.id}
        className="block h-auto max-w-400 border-b-2 pt-3 "
        data-test-id={`blog-post-${product.id}`}
        aria-label={product.title}
      >
        {/*<p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p>*/}
        <div className="float-left w-1/6 ">
          <Image src={product.imageUrl} alt={product.title} width={200} height={200}/>
        </div>
        <div className="float-left w-4/6">
        <Link className="text-xl"href={`/product/${product.urlId}`}>{product.title}</Link>
        
        <p className="">{product.categories}</p>
        <p>{product.description}</p>
        </div>
        <div className="float-right text-right w-1/6 ">
        <p className="text-xl">${product.price.toFixed(2)}</p>
        <CartButton productId={product.id} className="mt-20"></CartButton>
        </div>
      </article>
    </div>
  );
}

