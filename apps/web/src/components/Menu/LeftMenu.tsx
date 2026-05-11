import { products } from "@repo/db/data";
import { client } from "@repo/db/client";
import { CategoryList } from "./CategoryList";
import { HistoryList } from "./HistoryList";
import { TagList } from "./TagList";
import Link from "next/link";

export async function LeftMenu() {
  //const posts = await client.db.post.findMany({include:{likes:true}});
  return (
    <div>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <Link className="text-2xl"href="/">Store</Link>
      <nav>
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {/*
          <li>
            <CategoryList posts={posts} />
          </li>
          
          <li>
            <HistoryList selectedYear="" selectedMonth="" posts={posts} />
          </li>
          */}
          <li>
            <TagList selectedTag="" products={products} />
          </li>
          
          <li>Admin</li>
        </ul>
      </nav>
    </div>
  );
}
