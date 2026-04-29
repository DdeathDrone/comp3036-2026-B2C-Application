"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "../Themes/ThemeSwitcher";
import { toUrlPath } from "@repo/utils/url";

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
    <div>
      <form action="#" method="GET" className="grid flex-1 grid-cols-1" >
        <input id="search" type="text" placeholder="Search" onChange={e => handleSearch(e)} /> 
      </form>
      <div className="flex items-center gap-x-6">
        <ThemeSwitch />
      </div>
    </div>
  );
}
