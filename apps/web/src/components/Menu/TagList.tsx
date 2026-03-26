import { type Post } from "@repo/db/data";
import { tags } from "../../functions/tags";
import { LinkList } from "./LinkList";
import { SummaryItem } from "./SummaryItem";
import { toUrlPath } from "@repo/utils/url";

export async function TagList({
  selectedTag,
  posts,
}: {
  selectedTag?: string;
  posts: Post[];
}) {
  const postTags = await tags(posts);

  return (
    <LinkList title="Tags">
      {postTags.map((post) => (
        <SummaryItem
          key={post.name}
          name={post.name}
          link={`/tags/${toUrlPath(post.name)}`}
          isSelected={selectedTag == post.name}
          title=""
          count={post.count}
        />
      ))}
    </LinkList>
  );
}
