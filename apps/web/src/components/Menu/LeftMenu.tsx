import { posts } from "@repo/db/data";
import { CategoryList } from "./CategoryList";
import { HistoryList } from "./HistoryList";
import { TagList } from "./TagList";
import Link from "next/link";

export function LeftMenu() {
  
  return (
    <div>
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <Link className="text-2xl"href="/">Blog</Link>
      <nav>
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <CategoryList posts={posts} />
          </li>
          <li>
            <HistoryList selectedYear="" selectedMonth="" posts={posts} />
          </li>
          <li>
            <TagList selectedTag="" posts={posts} />
          </li>
          <li>Admin</li>
        </ul>
      </nav>
    </div>
  );
}
