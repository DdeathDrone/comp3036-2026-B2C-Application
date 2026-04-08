"use client"
import { Post } from "@repo/db/data";
import { useActionState, useState } from "react";
import { updatePost } from "../functions/updatePost";
import { marked } from "marked";
export function PostForm({post} : {post? : Post}){
    const [state, formAction] = useActionState(updatePost, {success:false})
    const [preview, setPreview] = useState({state: false, content: ""})

    return (
        <form className="inline-block p-2" action={formAction}>
            <div>
                <label htmlFor="Title">Title</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="Title" id="Title" ></input>
            </div>

            <div>
                <label htmlFor="Description">Description</label>
                <textarea className="border-1 ml-5 field-sizing-content scroll-auto pl-2 pr-2 max-h-50 max-w-200 text-balance " name="Description" id="Description" ></textarea>
                
            
            </div>
            <div>
                <button type="button" className="bg-black text-white rounded-2xl py-1 px-2" name="Preview" onClick={() =>
                     setPreview({state: !preview.state, content: "" }) 
                     
                     }>Preview</button>

            </div>
            { preview.state ? 
            <div>
                <label className=""htmlFor="previewContent">Content Preview</label>
                <p dangerouslySetInnerHTML={{ __html: preview.content}}className="border-1 scroll-auto ml-5 text-balance field-sizing-content rows=2 max-h-50 max-w-200 pl-2 pr-2"  id="previewContent" data-test-id="content-preview" >{}</p>
            </div>
            :
            <div>
                
                <label className=""htmlFor="Content">Content</label>
                <textarea className="border-1 scroll-auto ml-5 text-balance field-sizing-content rows=2 max-h-50 max-w-200 pl-2 pr-2" name="Content" id="Content" ></textarea>
            </div>
            }
            <div>
                <label htmlFor="Tags">Tag List</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="Tags" id="Tags" ></input>
            </div>
            <div>
                <label htmlFor="ImageUrl">Image URL</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="ImageUrl" id="ImageUrl"></input>
            </div>
            {state.error && <p className="text-red-500">{state.error}</p>}

            <button>Save</button>
        </form>
    )
}