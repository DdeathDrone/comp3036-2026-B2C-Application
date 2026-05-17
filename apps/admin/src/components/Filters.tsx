"use client"

import { Product } from "@repo/db/data"
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
  products: Product[],
  filters: {content?: string, category?: string, date?: Date, active: boolean}
}

	type Action = 
  | { type: 'FILTER', event: React.ChangeEvent<HTMLInputElement>, productInit: Product[]}
  | { type: 'SORT', event: React.ChangeEvent<HTMLSelectElement>}
  | {type: 'CLEAR'}

const reducer = (state: State, action: Action) => {
  switch (action.type){
    case "FILTER":
      let result: {content?: string, category?: string, date?: Date, active: boolean} = state.filters;
      if(action.event.target.name == "ContentFilter"){
        result = {content: action.event.target.value.toLowerCase(), category: state.filters.category, date: state.filters.date, active: state.filters.active}
      } 
      else if(action.event.target.name== "CategoryFilter"){
        result = {category: action.event.target.value.toLowerCase(), content: state.filters.content, date: state.filters.date, active: state.filters.active}
      } 
      else if(action.event.target.name == "DateFilter"){
        result= {date: action.event.target.valueAsDate == null ? undefined : action.event.target.valueAsDate, content: state.filters.content, category: state.filters.category, active: state.filters.active }
      } 
      else if (action.event.target.name == "ActiveFilter"){
        result = {active: action.event.target.checked, content: state.filters.content, category: state.filters.category, date: state.filters.date}
      };
      return{
        filters: result,
        products: action.productInit.filter((p)=> (result.content == undefined ? true : p.title.toLowerCase().includes(result.content) ||
        p.content.toLowerCase().includes(result.content)) 
        && (result.category == undefined ? true : p.categories.toLowerCase().includes(result.category)) 
        && (result.date == undefined ? true : p.date.getFullYear() >= result.date.getFullYear())
        && (result.active ? p.active : true )),
        
      };
    case "SORT":
      const r : Product[] = state.products;
      if(action.event.target.value == "title-asc"){
        r.sort((a,b)=> a.title.localeCompare(b.title))
      }
      else if(action.event.target.value == "title-desc"){

        r.sort((a,b)=> b.title.localeCompare(a.title))

      }
      else if(action.event.target.value == "date-asc"){
        r.sort((a,b) => a.date.valueOf() - b.date.valueOf())
      }
      else if(action.event.target.value == "date-desc"){
        r.sort((a,b) => b.date.valueOf() - a.date.valueOf())
      }
      return{
        filters: state.filters,
        products: r,
        
        
      };
    case "CLEAR":
      return{
        filters: {content: undefined, category: undefined, date: undefined, active:false},
        products: state.products
      }
    default:
      throw new Error("Action not handled");
  }
}

export function Filters({products} : {products : Product[]}){
    
  const [state, dispatch] = useReducer(reducer, {products: [...products].sort((a,b) => b.date.valueOf() - a.date.valueOf()), filters: {content: undefined, category: undefined, date: undefined, active:false}});

    /*const handleDebounce = debounce( // Intended to prevent too many refreshes, but tests hate it sooooooooooo idk
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({type: "FILTER", event: event, productInit: products});
    });*/

    return (<>
        <form className="flex flex-row mt-1">

          <label htmlFor="Sort">Sort By:</label>
          <select className="border ml-2 mr-2" name="Sort" id="Sort" defaultValue="date-desc" onChange={(e) => dispatch({type: "SORT", event: e})}>
            <option value="title-asc" id="title-asc">title-asc</option>
            <option value="title-desc" id="title-desc">title-desc</option>
            <option value="date-asc" id="date-asc">date-asc</option>
            <option value="date-desc" id="date-desc">date-desc</option>
          </select>

          <label htmlFor="ContentFilter">Filter by Content:</label> 
          <input className="border ml-2 mr-2" type="text" name="ContentFilter" id="ContentFilter" onChange={(e) => dispatch({type: "FILTER", event: e, productInit: products})}></input>

          <label htmlFor="CategoryFilter">Filter by Category:</label>
          <input className="border ml-2 mr-2" type="text" name="CategoryFilter" id="CategoryFilter" onChange={(e) => dispatch({type: "FILTER", event: e, productInit: products})}></input>

          <label htmlFor="DateFilter">Filter by Date Created:</label>
          <input className="border ml-2 mr-2" type="date" name="DateFilter"  id="DateFilter"  onChange={(e) => dispatch({type: "FILTER", event: e, productInit: products})}></input>

          <label htmlFor="ActiveFilter">Show Only Active Products:</label>
          <input className="ml-2 mt-1"type="checkbox"  id="ActiveFilter" name="ActiveFilter" onChange={(e) => dispatch({type: "FILTER", event: e, productInit: products})}></input>

          <button className="border ml-2 mr-2 px-2" onClick={(e) => dispatch({type: "CLEAR"})}>Clear Filters</button>
        </form>
        <ul>
          {state.products.map((p) => (
            <li key={p.id}>
              <AdminList product={p}></AdminList>
            </li>
          ))}
        </ul>
        </>
    )
}