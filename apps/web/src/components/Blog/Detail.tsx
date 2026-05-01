import type { Post } from "@repo/db/data";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./LikeButton";

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content);
  const update = await fetch(`http://localhost:3001/api/views?urlId=${post.urlId}`,{
    method:"PATCH",
  });

  const date = Intl.DateTimeFormat("en-US", 
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).formatToParts(post.date);

  return <article data-test-id={`blog-post-${post.id}`}>
    <Link href={`/post/${post.urlId}`}>{post.title}</Link>
     <p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p> 
     <p> {post.category}</p>
    <Image src={post.imageUrl} alt={"image"} width={500} height={400}/>
    <div data-test-id="content-markdown" dangerouslySetInnerHTML={{ __html: content}}></div>
    <p>#{post.tags.replace(",", " #")}</p>
    <p>{post.views+1} views {post.likes.length} likes</p>
    <LikeButton postid={post.id}></LikeButton>
  </article>;
}
