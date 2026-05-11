"use client"

import { useRouter } from "next/navigation";

export function LikeButton({postid} : {postid: number}){
    const router = useRouter();
    return <button className="bg-black text-white rounded-2xl py-1 px-2" data-test-id="like-button" 
    onClick={async () => {
        const update = await fetch(`/api/likes?id=${postid}`,{method:"PATCH"});
        
        router.refresh();
        
    }}
    >Like Post</button>
}