"use client"
import { Post } from "@repo/db/data";
import { useActionState, useState, useRef, RefObject, createRef} from "react";
import { updatePost } from "../functions/updatePost";
import { marked } from "marked";
export function PostForm({post} : {post? : Post}){
    const [state, formAction] = useActionState(updatePost, {success:false, postId: post?.id, urlId: post?.urlId});
    const [preview, setPreview] = useState({state: false,  contentParsed: ""});
    const [postData, setPostData] = useState({title: post?.title, desc: post?.description, content: post?.content == undefined ? "" : post.content.trim(), tags: post?.tags, img: post?.imageUrl, category: post?.category});
    const inputRef = createRef<HTMLTextAreaElement>()

    //TODO: fix indents because character limit 


    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const result = event.target.value;
        if(event.target.name == "title"){
            setPostData({title: result, desc: postData.desc, content: postData.content, tags: postData.tags, img: postData.img, category: postData.category});
        }
        else if(event.target.name == "description"){
            setPostData({title: postData.title, desc: result, content: postData.content, tags: postData.tags, img: postData.img, category: postData.category});
        }
        else if(event.target.name == "content"){
            setPostData({title: postData.title, desc: postData.desc, content: event.target.value, tags: postData.tags, img: postData.img, category: postData.category});
        }
        else if(event.target.name == "tags"){
            setPostData({title: postData.title, desc: postData.desc, content: postData.content, tags: result, img: postData.img, category: postData.category});
        }
        else if(event.target.name == "imageUrl"){
            setPostData({title: postData.title, desc: postData.desc, content: postData.content, tags: postData.tags, img: result, category: postData.category});
        }
        else if(event.target.name == "category"){
            setPostData({title: postData.title, desc: postData.desc, content: postData.content, tags: postData.tags, img: postData.img, category: result});
        }
    }
    return (
        <form className="inline-block p-2" action={formAction}>
            <div>
                <label htmlFor="title">Title</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="title" id="title" value={postData.title ? postData.title : ""} onChange={handleChange}></input>
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <div></div>
                <textarea className="border-1 ml-5 field-sizing-content scroll-auto pl-2 pr-2 max-h-50 max-w-200 text-wrap " name="description" id="description" value={postData.desc ? postData.desc : ""} onChange={handleChange}></textarea>
                
            
            </div>
            <div>
                <button className="bg-black text-white rounded-2xl py-1 px-2" id="Preview" formAction={async (formData : FormData) => {
                     setPreview({state: !preview.state, 
                        contentParsed: preview.state ? preview.contentParsed : await marked.parse(formData.get("content") as string)  })
                        console.log(inputRef.current);
                        if(preview.state){
                            if(inputRef.current != null){
                            inputRef.current.focus();
                            }
                            
                        }
                        
                     }
                     
                     }>{preview.state ? "Close Preview" :"Preview"}</button>

            </div>
            { preview.state ? 
            <div>
                <label className=""htmlFor="previewContent">Content Preview</label>
                <p dangerouslySetInnerHTML={{ __html: preview.contentParsed}}className="border-1 scroll-auto ml-5 text-balance rows=2 h-50 w-200 pl-2 pr-2"  id="previewContent" data-test-id="content-preview" ></p>
            </div>
            :<></>}
            <div>
                
                <label className=""htmlFor="content">Content</label>
                <div></div>
                <textarea ref={inputRef} className="border-1 scroll-auto ml-5 text-balance h-50 w-200 pl-2 pr-2 resize-none"  name="content" id="content"  value={postData.content ? postData.content : ""} onChange={handleChange}></textarea>
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="category" id="category" value={postData.category ? postData.category : ""} onChange={handleChange} ></input>
            </div>

            <div>
                <label htmlFor="tags">Tags</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="tags" id="tags" value={postData.tags ? postData.tags : ""} onChange={handleChange} ></input>
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" type="text" name="imageUrl" id="imageUrl" value={postData.img ? postData.img : ""} onChange={handleChange} ></input>
                <div>
                    <img data-test-id="image-preview" src={postData.img == "" ? undefined : postData.img} width={300} height={300} alt="Image not found"></img>
                </div>
            </div>
            {state.error && <p className="text-red-500">{state.error}</p>}

            <button className="bg-black text-white rounded-2xl py-1 px-2 mb-20 mt-3">Save</button>
            {state.success && <p className="text-green-500">Successfully updated data</p>}
            {state.error && <p className="text-red-500">Please fix the errors before saving</p>}

        </form>
    )
}