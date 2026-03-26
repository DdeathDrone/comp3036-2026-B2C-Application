import type { Post } from "@repo/db/data";
import { marked } from "marked";
import Image from "next/image";

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content);

  return <article data-test-id={`blog-post-${post.id}`}>
    <h1>{post.title}</h1> <p>{post.date.toLocaleDateString()}</p> <p> {post.category}</p>
    <Image src={post.imageUrl} alt={"image"} width={500} height={400}/>
    <div dangerouslySetInnerHTML={{ __html: content}}></div>
    <p>#{post.tags.replace(",", " #")}</p>
    <p>👁️{post.views} ❤️{post.likes}</p>
  </article>;
}
