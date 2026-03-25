import type { Post } from "@repo/db/data";
import Image from "next/image";

export function BlogListItem({ post }: { post: Post }) {
  return (
    <article
      key={post.id}
      className="flex flex-row gap-8"
      data-test-id={`blog-post-${post.id}`}
    >
      <Image src={post.imageUrl} alt={"image"} width={400} height={300}/>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>#{post.tags.replace(",", " #")}</p>
      <p>👁️{post.views} ❤️{post.likes}</p>
    </article>
  );
}

