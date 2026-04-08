"use server"

export async function updatePost(prevState: {success: boolean, error?: string}, formData : FormData) : Promise<{success: boolean; error?: string}>{
    const title = formData.get('Title') as string;
    const description = formData.get('Description') as string;
    const content = formData.get('Content') as string;
    const tags = formData.get('Tags') as string;
    const imageUrl = formData.get('ImageUrl') as string;

    if(title.length == 0 ){
        return {success:false, error:"Title is required"}
    }
    else if(description.length == 0){
        return {success: false, error: "Description is required"}
    }
    else if(description.length > 200){
        return {success: false, error: "Description is too long. Maximum is 200 characters"}
    }
    else if(content.length == 0){
        return {success: false, error: "Content is required"}
    }
    else if(imageUrl.length == 0){
        return {success: false, error: "Image URL is required"}
    }
    else if(imageUrl.length == 0){ // TODO: check validity of url
        return {success: false, error: "This is not a valid URL"}
    }
    else if(tags.length == 0){
        return {success: false, error:"At least one tag is required"}
    }
    return {success: true};

}