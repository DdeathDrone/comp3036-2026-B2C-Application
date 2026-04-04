"use client"




export function Filters(){
    return (
        <form className="flex flex-row mt-1">

            <label htmlFor="ContentFilter">Filter by Content:</label> 
            <input className="border ml-2 mr-2" type="text" name="ContentFilter"></input>

            <label htmlFor="TagFilter">Filter by Tag:</label>
            <input className="border ml-2 mr-2" type="text" name="TagFilter"></input>

            <label htmlFor="DateFilter">Filter by Date Created:</label>
            <input className="border ml-2 mr-2" type="text" name="DateFilter"></input>

            <label htmlFor="ActiveFilter">Show Only Active Posts:</label>
            <input className="ml-2 mt-1"type="checkbox" name="ActiveFilter"></input>
        </form>
    )
}