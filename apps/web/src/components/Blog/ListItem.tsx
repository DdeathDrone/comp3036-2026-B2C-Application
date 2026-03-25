import type { Post } from "@repo/db/data";
import Image from "next/image";
import Link from "next/link";

export function BlogListItem({ post }: { post: Post }) {
  return (
    <article
      key={post.id}
      className="flex flex-row gap-8"
      data-test-id={`blog-post-${post.id}`}
    >
      <p>{post.date.toLocaleDateString()} {post.category}</p>
      <Image src={post.imageUrl} alt={"image"} width={400} height={300}/>
      <Link href={`/post/${post.urlId}`}><h2>{post.title}</h2></Link>
      <p>{post.description}</p>
      <p>#{post.tags.replace(",", " #")}</p>
      <p>👁️{post.views} ❤️{post.likes}</p>
    </article>
  );
}

