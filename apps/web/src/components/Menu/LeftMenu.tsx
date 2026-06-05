import { products } from "@repo/db/data";
import { client } from "@repo/db/client";
import { CategoryList } from "./CategoryList";
import Link from "next/link";

export async function LeftMenu({selected}: {selected?: string}) {
  //const posts = await client.db.post.findMany({include:{likes:true}});
  return (
    <div className="fixed flex-1 pl-2 inset-y-0 inset-left-0 bg-blue-300 mt-15 space-x-10 w-40 text-black border-r-2">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      
      <nav aria-label="Left Navigation">
        <ul role="list" className="">
          <li>
            <CategoryList selectedTag={selected} products={products} />
          </li>
          
        </ul>
      </nav>
    </div>
  );
}
