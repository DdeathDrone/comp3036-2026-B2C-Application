"use client"

import { useRouter } from "next/navigation";


function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function Search({ query }: { query?: string }) {
  const router = useRouter();
  

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      router.push(`/search?q=${search}`);
    },
  );
  return (
    

      <form action="#" method="GET" className="grid flex-1 grid-cols-1 col-span-3" >
        <input id="search" type="text" aria-label="Product Search" placeholder="Search" onChange={e => handleSearch(e)} /> 
      </form>

  )
}