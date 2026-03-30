import type { Post } from "@repo/db/data";
import Image from "next/image";
import Link from "next/link";

export function BlogListItem({ post }: { post: Post }) {
  
  const date = Intl.DateTimeFormat("en-US", 
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  ).formatToParts(post.date);

  return (
    <article
      key={post.id}
      className="flex flex-row gap-8"
      data-test-id={`blog-post-${post.id}`}
    >
      <p>{date[2]?.value + " " + date[0]?.value + " " + date[4]?.value } </p>
      <p>{post.category}</p>
      <Image src={post.imageUrl} alt={"image"} width={400} height={300}/>
      <Link href={`/post/${post.urlId}`}>{post.title}</Link>
      <p>{post.description}</p>
      <p>#{post.tags.replace(",", " #")}</p>
      <p>{post.views} views {post.likes} likes</p>
    </article>
  );
}

