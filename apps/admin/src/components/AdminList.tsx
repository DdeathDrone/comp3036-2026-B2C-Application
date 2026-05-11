"use client"
import { Post } from "@repo/db/data"
import { useRouter, redirect, RedirectType } from "next/navigation";
import { useState } from "react";

export function AdminList({post} : {post : Post}){
  const router = useRouter();
  const [isActive, setActive] = useState(post.active);
    const date = Intl.DateTimeFormat("en-US", 
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).formatToParts(post.date);
    return (
    <>
    <article className="ml-2 mb-2">
        <a href={`/post/${post.urlId}`} className="text-xl">{post.title}</a>
        <img src={post.imageUrl} width={200} height={200} alt="image"></img>
        <p>{"#" + post.tags.split(",")[0] + ", #" + post.tags.split(",")[1]}</p>
        <p>{"Posted on " + date[0]?.value + " " + date[2]?.value + ", " + date[4]?.value}</p>
        <p>Category: {post.category}</p>
        <button className="border border-black rounded-sm px-1"onClick={async ()=> {await fetch(`api/posts?id=${post.id}${ isActive ? ("&active=" + isActive) : ""}`, {
            method: "PATCH"
          });
          setActive(!isActive);
          router.push("/");
          }
        }
        >{isActive ? "Active" : "Inactive"}</button>
        </article>
    </>
    )
}