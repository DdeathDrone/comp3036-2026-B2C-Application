"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "../Themes/ThemeSwitcher";
import { toUrlPath } from "@repo/utils/url";
import Link from "next/link";

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function TopMenu({ query }: { query?: string }) {
  const router = useRouter();

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      router.push(`/search?q=${search}`);
    },
  );

  return (
    <div className="fixed pl-30 inset-x-0 top-0 grid flex-1 grid-cols-4 bg-gray-400 h-10">

      <form action="#" method="GET" className="grid flex-1 grid-cols-1 col-span-3" >
        <input id="search" type="text" placeholder="Search" onChange={e => handleSearch(e)} /> 
      </form>
      <div className="">
        <ThemeSwitch />
      </div>
    </div>
  );
}
