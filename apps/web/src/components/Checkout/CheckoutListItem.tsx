import { cartRemove } from "@/functions/cartRemove";
import { cartUpdate } from "@/functions/cartUpdate";
import type { Product } from "@repo/db/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CheckoutListItem({ product, quantity }: { product: Product, quantity: number }) {
    const [quant, setQuant] = useState(quantity); 
  
  return (
    <div className="flex place-content-center">
      <article
        key={product.id}
        className="block max-w-400 border-b-2 pt-3 "
        data-test-id={`blog-post-${product.id}`}
        aria-label={product.title}
      >
        {/*<p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p>*/}
        <div className="block w-1/6 float-left isolate">
          <Image src={product.imageUrl} alt={product.title} width={200} height={200}/>
        </div>
        <div className="block w-4/6 float-left isolate">
        <Link className="text-xl"href={`/product/${product.urlId}`}>{product.title}</Link>
        
        <p className="">{product.categories}</p>
        <p>{product.description}</p>
        </div>
        <div className="block isolate float-right w-1/6">
        
          <p className="text-right">Price: ${product.price.toFixed(2)}</p>
          <div className="text-right">
            <label htmlFor="Quantity" className="">Quantity: </label>
            <input type="number" name="Quantity" id="Quantity" data-test-id={`quantity-${product.id}`} className="text-right w-15" value={quant} onChange={(e) => setQuant(parseInt(e.target.value))}></input>
          </div>
          <p className="text-right pt-2"><button className="text-blue-700" onClick={async () => await cartUpdate(product.id, quant)}>Update</button></p>
          <p className="text-right pt-2"><button className="text-red-400" onClick={ async () => await cartRemove(product.id)}>Remove</button></p>


          <p className="text-right">Total: ${(quantity*product.price).toFixed(2)}</p>
        
        </div>
      </article>
    </div>
  );
}

