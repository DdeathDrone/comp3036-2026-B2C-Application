"use client"
import { Product } from "@repo/db/data";
import { useActionState, useState, useRef, RefObject, createRef} from "react";
import { updateProduct } from "../functions/updateProduct";
import { marked } from "marked";
export function ProductForm({product} : {product? : Product}){
    const [state, formAction] = useActionState(updateProduct, {success:false, productId: product?.id, urlId: product?.urlId});
    const [preview, setPreview] = useState({state: false,  contentParsed: ""});
    const [productData, setproductData] = useState({title: product?.title, desc: product?.description, content: product?.content == undefined ? "" : product.content.trim(), img: product?.imageUrl, categories: product?.categories, price: product?.price.toString(), stock: product?.stock.toString()});
    const inputRef = createRef<HTMLTextAreaElement>()

    //TODO: fix indents because character limit 


    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const result = event.target.value;
        if(event.target.name == "Title"){
            setproductData({title: result, desc: productData.desc, content: productData.content, img: productData.img, categories: productData.categories, stock: productData.stock, price: productData.price});
        }
        else if(event.target.name == "Description"){
            setproductData({title: productData.title, desc: result, content: productData.content, img: productData.img, categories: productData.categories, stock: productData.stock, price: productData.price});
        }
        else if(event.target.name == "Content"){
            setproductData({title: productData.title, desc: productData.desc, content: event.target.value, img: productData.img, categories: productData.categories, stock: productData.stock, price: productData.price});
        }
        else if(event.target.name == "ImageUrl"){
            setproductData({title: productData.title, desc: productData.desc, content: productData.content, img: result, categories: productData.categories, stock: productData.stock, price: productData.price});
        }
        else if(event.target.name == "Categories"){
            setproductData({title: productData.title, desc: productData.desc, content: productData.content, img: productData.img, categories: result, stock: productData.stock, price: productData.price});
        }
        else if(event.target.name == "Stock"){
            setproductData({title: productData.title, desc: productData.desc, content: productData.content, img: productData.img, categories: productData.categories, stock: result, price: productData.price});
        }
        else if(event.target.name == "Price"){
            setproductData({title: productData.title, desc: productData.desc, content: productData.content, img: productData.img, categories: productData.categories, stock: productData.stock , price: result});
        }
    }
    return (
        <form className="inline-block p-2" action={formAction}>
            <div>
                <label htmlFor="Title">Title</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" aria-label="Title Input" type="text" name="Title" id="Title" value={productData.title ? productData.title : ""} onChange={handleChange}></input>
            </div>

            <div>
                <label htmlFor="Description">Description</label>
                <div></div>
                <textarea className="border-1 ml-5 field-sizing-content scroll-auto pl-2 pr-2 max-h-50 max-w-200 text-wrap " aria-label="Description Input" name="Description" id="Description" value={productData.desc ? productData.desc : ""} onChange={handleChange}></textarea>
                
            
            </div>
            <div>
                <button className="bg-black text-white rounded-2xl py-1 px-2" aria-label="Preview Button" id="Preview" formAction={async (formData : FormData) => {
                     setPreview({state: !preview.state, 
                        contentParsed: preview.state ? preview.contentParsed : await marked.parse(formData.get("Content") as string)  })
                        //console.log(inputRef.current);
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
                <p aria-label="Content Preview" dangerouslySetInnerHTML={{ __html: preview.contentParsed}}className="border-1 scroll-auto ml-5 text-balance rows=2 h-50 w-200 pl-2 pr-2"  id="previewContent" data-test-id="content-preview" ></p>
            </div>
            :<></>}
            <div>
                
                <label className=""htmlFor="Content">Content</label>
                <div></div>
                <textarea ref={inputRef} className="border-1 scroll-auto ml-5 text-balance h-50 w-200 pl-2 pr-2 resize-none" aria-label="Content Input" name="Content" id="Content"  value={productData.content ? productData.content : ""} onChange={handleChange}></textarea>
            </div>

            <div>
                <label htmlFor="Categories">Categories</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" aria-label="Categories Input" type="text" name="Categories" id="Categories" value={productData.categories ? productData.categories : ""} onChange={handleChange} ></input>
            </div>
            <div>
                <label htmlFor="Stock">Stock</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" aria-label="Stock Input" type="number" name="Stock" id="Stock" value={productData.stock ? productData.stock : ""} onChange={handleChange} ></input>
            </div>
            <div>
                <label htmlFor="Price">Price</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" aria-label="Price Input" type="number" name="Price" id="Price" value={productData.price ? productData.price : ""} onChange={handleChange} ></input>
            </div>
            <div>
                <label htmlFor="ImageUrl">Image URL</label>
                <input className="border-1 mb-5 ml-5 field-sizing-content pl-2 pr-2" aria-label="Image URL Input" type="text" name="ImageUrl" id="ImageUrl" value={productData.img ? productData.img : ""} onChange={handleChange} ></input>
                <div>
                    <img data-test-id="image-preview" src={productData.img == "" ? undefined : productData.img} width={300} height={300} alt="Image not found"></img>
                </div>
            </div>
            {state.error && <p className="text-red-500">{state.error}</p>}

            <button className="bg-black text-white rounded-2xl py-1 px-2 mb-20 mt-3">Save</button>
            {state.success && <p className="text-green-500">product updated successfully</p>}
            {state.error && <p className="text-red-500">Please fix the errors before saving</p>}

        </form>
    )
}