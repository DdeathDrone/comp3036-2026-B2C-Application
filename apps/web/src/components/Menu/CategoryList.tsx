import { type Product } from "@repo/db/data";
import { categories } from "../../functions/categories";
import { LinkList } from "./LinkList";
import { SummaryItem } from "./SummaryItem";
import { toUrlPath } from "@repo/utils/url";

export async function CategoryList({
  selectedTag,
  products,
}: {
  selectedTag?: string;
  products: Product[];
}) {
  const productCategories = await categories(products);

  return (
    <LinkList title="Categories">
      {productCategories.map((product) => (
        <SummaryItem
          key={product.name}
          name={product.name}
          link={`/category/${toUrlPath(product.name)}`}
          isSelected={selectedTag == toUrlPath(product.name)}
          title={"Category / " + product.name}
          count={product.count}
        />
      ))}
    </LinkList>
  );
}
