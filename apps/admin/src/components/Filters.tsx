"use client"

import { Post } from "@repo/db/data"
import { useEffect, useState } from "react"
import { AdminList } from "./AdminList";

type Any = any;

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function Filters({posts} : {posts : Post[]}){
    const [post, setPosts] = useState(posts);
    const [filters, setFilters] = useState<{content?: string, tag?: string, date?: Date, active: boolean}>({content: undefined, tag: undefined, date: undefined, active:false})

    const handleFilter = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      console.log(search)
      if(event.target.name == "ContentFilter"){
        setFilters({content: search.toLowerCase(), tag: filters.tag, date: filters.date, active: filters.active})
      } 
      else if(event.target.name == "TagFilter"){
        setFilters({tag: search.toLowerCase(), content: filters.content, date: filters.date, active: filters.active})
      } 
      else if(event.target.name == "DateFilter"){
        setFilters({date: event.target.valueAsDate == null ? undefined : event.target.valueAsDate, content: filters.content, tag: filters.tag, active: filters.active })
      } 
      else if (event.target.name == "ActiveFilter"){
        setFilters({active: event.target.checked, content: filters.content, tag:filters.tag, date: filters.date})
      }
      
      
    },

  );
  useEffect(()=>{
        setPosts(posts.filter((p)=> (filters?.content == undefined ? true : p.title.toLowerCase().includes(filters.content) ||
        p.content.toLowerCase().includes(filters.content)) 
        && (filters?.tag == undefined ? true : p.tags.toLowerCase().includes(filters.tag)) 
        && (filters?.date == undefined ? true : p.date.toDateString() == filters.date.toDateString())
        && (filters.active ? p.active : true )
        
    ));       //console.log(filters);

      }, [filters]);
    return (<>
        <form className="flex flex-row mt-1">

            <label htmlFor="ContentFilter">Filter by Content:</label> 
            <input className="border ml-2 mr-2" type="text" name="ContentFilter" onChange={handleFilter}></input>

            <label htmlFor="TagFilter">Filter by Tag:</label>
            <input className="border ml-2 mr-2" type="text" name="TagFilter" onChange={handleFilter}></input>

            <label htmlFor="DateFilter">Filter by Date Created:</label>
            <input className="border ml-2 mr-2" type="date" name="DateFilter" onChange={handleFilter}></input>

            <label htmlFor="ActiveFilter">Show Only Active Posts:</label>
            <input className="ml-2 mt-1"type="checkbox" name="ActiveFilter" onChange={handleFilter}></input>

            <button className="border ml-2 mr-2" onClick={()=>setFilters({content: undefined, tag: undefined, date: undefined, active:false})}>Clear Filters</button>
        </form>
        <ul>
          {post.map((p) => (
            <li key={p.id}>
              <AdminList post={p}></AdminList>
            </li>
          ))}
        </ul>
        </>
    )
}