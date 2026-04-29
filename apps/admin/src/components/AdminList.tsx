"use client"
import { Post } from "@repo/db/data"

export function AdminList({post} : {post : Post}){
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
        <button className="border border-black rounded-sm px-1"onClick={()=> alert(`Post is ${post.active ? "active" : "inactive"}`)}>{post.active ? "Active" : "Inactive"}</button>
        </article>
    </>
    )
}