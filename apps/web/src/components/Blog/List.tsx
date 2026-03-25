import type { Post } from "@repo/db/data";
import { BlogListItem } from "./ListItem";

export function BlogList({ posts }: { posts: Post[] }) {
  return <div className="py-6">
    <ul>
      {posts.length == 0 ? "0 posts" : posts.map((post)=>(
        <li key = {post.id}>
          {post.active ? <BlogListItem post={post}/> : null}  {/* If post is active display blogListItem else nothing */}
        </li>
      ))}
    </ul></div>;
}

export default BlogList;
