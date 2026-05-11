import { type Product } from "@repo/db/data";
import { tags } from "../../functions/tags";
import { LinkList } from "./LinkList";
import { SummaryItem } from "./SummaryItem";
import { toUrlPath } from "@repo/utils/url";

export async function TagList({
  selectedTag,
  products,
}: {
  selectedTag?: string;
  products: Product[];
}) {
  const postTags = await tags(products);

  return (
    <LinkList title="Categories">
      {postTags.map((post) => (
        <SummaryItem
          key={post.name}
          name={post.name}
          link={`/category/${toUrlPath(post.name)}`}
          isSelected={selectedTag == post.name}
          title={"Category / " + post.name}
          count={post.count}
        />
      ))}
    </LinkList>
  );
}
