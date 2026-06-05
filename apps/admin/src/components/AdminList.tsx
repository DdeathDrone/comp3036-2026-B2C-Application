"use client"
import { Product } from "@repo/db/data"
import { useRouter, redirect, RedirectType } from "next/navigation";
import { useState } from "react";

export function AdminList({product} : {product : Product}){
  const router = useRouter();
  const [isActive, setActive] = useState(product.active);
    const date = Intl.DateTimeFormat("en-US", 
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).formatToParts(product.date);
    return (
    <div className="flex place-content-center">
    <article className="block min-w-300 max-w-400 border-b-2 pt-3 " aria-label="Product List">
        
        <div className="float-left w-1/6 object-fit-cover">
          <img className="object-fit-cover" src={product.imageUrl} width={200} height={200} alt="image"></img>
        </div>
        <div className="float-left w-1/4">
          <a href={`/product/${product.urlId}`} className="text-xl">{product.title}</a>
          <p>{"Product added on " + date[0]?.value + " " + date[2]?.value + ", " + date[4]?.value}</p>
          <p>Categories: {product.categories.replace(",", ", ")}</p>
        </div>
        <div className="float-right text-right w-1/4">
          <p>Stock: {product.stock}</p>
          <p>Price: ${product.price}</p>
          <button aria-label="Active Toggle" className="border border-black rounded-sm px-1"onClick={async ()=> {await fetch(`api/products?id=${product.id}${ isActive ? ("&active=" + isActive) : ""}`, {
              method: "PATCH"
            });
            setActive(!isActive);
            router.push("/");
            }
          }
          >{isActive ? "Active" : "Inactive"}</button>
        </div>
        </article>
    </div>
    )
}