import { products } from "@repo/db/data";
import { client } from "@repo/db/client";
import { CategoryList } from "./CategoryList";
import Link from "next/link";

export async function LeftMenu({selected}: {selected?: string}) {
  //const posts = await client.db.post.findMany({include:{likes:true}});
  return (
    <div className="fixed flex-1 inset-y-0 inset-left-0 bg-gray-400 space-x-10 w-30 text-black">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <Link className="text-2xl"href="/">Store</Link>
      <nav aria-label="Left Navigation">
        <ul role="list" className="">
          <li>
            <CategoryList selectedTag={selected} products={products} />
          </li>
          
          <li>Admin</li>
        </ul>
      </nav>
    </div>
  );
}
