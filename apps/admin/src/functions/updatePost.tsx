"use server"

export async function updatePost(prevState: {success: boolean, error?: string, postId?: number, urlId?: string}, formData : FormData) : Promise<{success: boolean; error?: string; postId?: number; urlId?: string}>{
    console.log(prevState.postId);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const category = formData.get('category') as string;

    if(title.length == 0 ){
        return {success:false, error:"Title is required", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(description.length == 0){
        return {success: false, error: "Description is required", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(description.length > 200){
        return {success: false, error: "Description is too long. Maximum is 200 characters", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(content.length == 0){
        return {success: false, error: "Content is required", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(imageUrl.length == 0){
        return {success: false, error: "Image URL is required", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(imageUrl)){ 
        return {success: false, error: "This is not a valid URL", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(tags.length == 0){
        return {success: false, error:"At least one tag is required", postId:prevState.postId, urlId: prevState.urlId}
    }
    else if(category.length == 0){
        return {success: false, error:"At least one category is required", postId:prevState.postId, urlId: prevState.urlId}
    }
    //console.log(JSON.stringify(Object.fromEntries(formData)))
    //console.log(JSON.stringify(formData));

    const result = await fetch(`http://localhost:3002/api/posts?urlId=${prevState.urlId}${prevState.postId ? "&id=" + prevState.postId : "" }`, 
        {
            method: "PUT",
            headers: {"Content-Type": "multipart/form-data"},
            body: JSON.stringify(Object.fromEntries(formData)),
        }
    );
    if(!result.ok){
        return {success: false, error: "Error when updating data, please try again later", postId:prevState.postId, urlId: prevState.urlId}
    }
    return {success: true, postId:prevState.postId, urlId: prevState.urlId};

}