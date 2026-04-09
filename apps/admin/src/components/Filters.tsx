"use client"

import { Post } from "@repo/db/data"
import { useEffect, useReducer, useState } from "react"
import { AdminList } from "./AdminList";

type Any = any;

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}


type State = {
  posts: Post[],
  filters: {content?: string, tag?: string, date?: Date, active: boolean}
}

	type Action = 
  | { type: 'FILTER', event: React.ChangeEvent<HTMLInputElement>, postInit: Post[]}
  | { type: 'SORT', event: React.ChangeEvent<HTMLSelectElement>}
  | {type: 'CLEAR'}

const reducer = (state: State, action: Action) => {
  switch (action.type){
    case "FILTER":
      let result: {content?: string, tag?: string, date?: Date, active: boolean} = state.filters;
      if(action.event.target.name == "ContentFilter"){
        result = {content: action.event.target.value.toLowerCase(), tag: state.filters.tag, date: state.filters.date, active: state.filters.active}
      } 
      else if(action.event.target.name== "TagFilter"){
        result = {tag: action.event.target.value.toLowerCase(), content: state.filters.content, date: state.filters.date, active: state.filters.active}
      } 
      else if(action.event.target.name == "DateFilter"){
        result= {date: action.event.target.valueAsDate == null ? undefined : action.event.target.valueAsDate, content: state.filters.content, tag: state.filters.tag, active: state.filters.active }
      } 
      else if (action.event.target.name == "ActiveFilter"){
        result = {active: action.event.target.checked, content: state.filters.content, tag: state.filters.tag, date: state.filters.date}
      };
      return{
        filters: result,
        posts: action.postInit.filter((p)=> (result.content == undefined ? true : p.title.toLowerCase().includes(result.content) ||
        p.content.toLowerCase().includes(result.content)) 
        && (result.tag == undefined ? true : p.tags.toLowerCase().includes(result.tag)) 
        && (result.date == undefined ? true : p.date.toDateString() == result.date.toDateString())
        && (result.active ? p.active : true )),
        
      };
    case "SORT":
      let r;
      if(action.event.target.value == "title-asc"){
        r = state.posts.sort((a,b)=> a.title.localeCompare(b.title))
      }
      else if(action.event.target.value == "title-desc"){
        r = state.posts.sort((a,b)=> b.title.localeCompare(a.title))
      }
      else if(action.event.target.value == "date-asc"){
        r = state.posts.sort((a,b) => a.date.valueOf() - b.date.valueOf())
      }
      else if(action.event.target.value == "date-desc"){
        r = state.posts.sort((a,b) => b.date.valueOf() - a.date.valueOf())
      }
      return{
        filters: state.filters,
        posts: r
      }
    case "CLEAR":
      return{
        filters: {content: undefined, tag: undefined, date: undefined, active:false},
        posts: state.posts
      }
    default:
      throw new Error("Action not handled");
  }
}

export function Filters({posts} : {posts : Post[]}){
    //const [post, setPosts] = useState(posts.sort((a,b) => a.title.localeCompare(b.title)));
    //const [filters, setFilters] = useState<{content?: string, tag?: string, date?: Date, active: boolean}>({content: undefined, tag: undefined, date: undefined, active:false})
    //const [sort, setSort] = useState("title-asc");

    const init : State = {posts: posts.sort((a,b) => a.title.localeCompare(b.title)), filters: {content: undefined, tag: undefined, date: undefined, active:false}}

    const [state, dispatch] = useReducer(reducer, init);
    console.log(state.filters);

    const handleDebounce = debounce( // Intended to prevent too many refreshes, but tests hate it sooooooooooo idk
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: "FILTER", event: event, postInit: posts});
    });

    /*
    const handleFilter = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      //console.log(search)
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

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setSort(event.target.value);
    if(event.target.value == "title-asc"){
      setPosts(post.sort((a,b)=> a.title.localeCompare(b.title)))
    }
    else if(event.target.value == "title-desc"){
      setPosts(post.sort((a,b)=> b.title.localeCompare(a.title)))
    }
    else if(event.target.value == "date-asc"){
      setPosts(post.sort((a,b) => a.date.valueOf() - b.date.valueOf()))
    }
    else if(event.target.value == "date-desc"){
      setPosts(post.sort((a,b) => b.date.valueOf() - a.date.valueOf()))
    }
  
  }

  useEffect(()=>{
        setPosts(posts.filter((p)=> (filters?.content == undefined ? true : p.title.toLowerCase().includes(filters.content) ||
        p.content.toLowerCase().includes(filters.content)) 
        && (filters?.tag == undefined ? true : p.tags.toLowerCase().includes(filters.tag)) 
        && (filters?.date == undefined ? true : p.date.toDateString() == filters.date.toDateString())
        && (filters.active ? p.active : true )
        
    ));       //console.log(filters);

      }, [filters]);
      */
    return (<>
        <form className="flex flex-row mt-1">

          <label htmlFor="Sort">Sort By:</label>
          <select className="border ml-2 mr-2" name="Sort" defaultValue="Title-asc" onChange={(e) => dispatch({type: "SORT", event: e})}>
            <option value="title-asc">Title-asc</option>
            <option value="title-desc">Title-desc</option>
            <option value="date-asc">Date-asc</option>
            <option value="date-desc">Date-desc</option>
          </select>

          <label htmlFor="ContentFilter">Filter by Content:</label> 
          <input className="border ml-2 mr-2" type="text" name="ContentFilter" id="ContentFilter" onChange={(e) => dispatch({type: "FILTER", event: e, postInit: posts})}></input>

          <label htmlFor="TagFilter">Filter by Tag:</label>
          <input className="border ml-2 mr-2" type="text" name="TagFilter" id="TagFilter" onChange={(e) => dispatch({type: "FILTER", event: e, postInit: posts})}></input>

          <label htmlFor="DateFilter">Filter by Date Created:</label>
          <input className="border ml-2 mr-2" type="date" name="DateFilter"  id="DateFilter"  onChange={(e) => dispatch({type: "FILTER", event: e, postInit: posts})}></input>

          <label htmlFor="ActiveFilter">Show Only Active Posts:</label>
          <input className="ml-2 mt-1"type="checkbox"  id="ActiveFilter" name="ActiveFilter" onChange={(e) => dispatch({type: "FILTER", event: e, postInit: posts})}></input>

          <button className="border ml-2 mr-2 px-2" onClick={(e) => dispatch({type: "CLEAR"})}>Clear Filters</button>
        </form>
        <ul>
          {state.posts.map((p) => (
            <li key={p.id}>
              <AdminList post={p}></AdminList>
            </li>
          ))}
        </ul>
        </>
    )
}