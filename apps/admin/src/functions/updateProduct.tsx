"use server"

export async function updateProduct(prevState: {success: boolean, error?: string, productId?: number, urlId?: string}, formData : FormData) : Promise<{success: boolean; error?: string; productId?: number; urlId?: string}>{
    //console.log(prevState.productId);
    const title = formData.get('Title') as string;
    const description = formData.get('Description') as string;
    const content = formData.get('Content') as string;
    //const tags = formData.get('Tags') as string;
    const imageUrl = formData.get('ImageUrl') as string;
    const category = formData.get('Categories') as string;

    if(title.length == 0 ){
        return {success:false, error:"Title is required", productId:prevState.productId, urlId: prevState.urlId}
    }
    else if(description.length == 0){
        return {success: false, error: "Description is required", productId:prevState.productId, urlId: prevState.urlId}
    }
    else if(description.length > 200){
        return {success: false, error: "Description is too long. Maximum is 200 characters", productId:prevState.productId, urlId: prevState.urlId}
    }
    else if(content.length == 0){
        return {success: false, error: "Content is required", productId:prevState.productId, urlId: prevState.urlId}
    }
    else if(imageUrl.length == 0){
        return {success: false, error: "Image URL is required", productId:prevState.productId, urlId: prevState.urlId}
    }
    else if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(imageUrl)){ 
        return {success: false, error: "This is not a valid URL", productId:prevState.productId, urlId: prevState.urlId}
    }
    //else if(tags.length == 0){
      //  return {success: false, error:"At least one tag is required", productId:prevState.productId, urlId: prevState.urlId}
    //}
    else if(category.length == 0){
        return {success: false, error:"At least one category is required", productId:prevState.productId, urlId: prevState.urlId}
    }
    //console.log(JSON.stringify(Object.fromEntries(formData)))
    //console.log(JSON.stringify(formData));

    const result = await fetch(`http://localhost:3002/api/products?urlId=${prevState.urlId}${prevState.productId ? "&id=" + prevState.productId : "" }`, 
        {
            method: "PUT",
            headers: {"Content-Type": "multipart/form-data"},
            body: JSON.stringify(Object.fromEntries(formData)),
        }
    );
    if(!result.ok){
        return {success: false, error: "Error when updating data, please try again later", productId:prevState.productId, urlId: prevState.urlId}
    }
    return {success: true, productId:prevState.productId, urlId: prevState.urlId};

}