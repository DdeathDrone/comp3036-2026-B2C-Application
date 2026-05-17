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
    <>
    <article className="ml-2 mb-2">
        <a href={`/product/${product.urlId}`} className="text-xl">{product.title}</a>
        <img src={product.imageUrl} width={200} height={200} alt="image"></img>
        <p>{"Product added on " + date[0]?.value + " " + date[2]?.value + ", " + date[4]?.value}</p>
        <p>Categories: {product.categories}</p>
        <p>Stock: {product.stock}</p>
        <p>Price: ${product.price}</p>
        <button className="border border-black rounded-sm px-1"onClick={async ()=> {/*await fetch(`api/products?id=${product.id}${ isActive ? ("&active=" + isActive) : ""}`, {
            method: "PATCH"
          });
          setActive(!isActive);
          router.push("/");
          */}
        }
        >{isActive ? "Active" : "Inactive"}</button>
        </article>
    </>
    )
}