// import { posts, type Post } from "../components/data";

export async function tags(posts: { tags: string; active: boolean }[]): Promise<{name: string, count: number}[]> {
  

  return posts
  .filter((p=>p.active))
  .reduce(
    (acc, post) =>{
     
      const tags = post.tags.split(",");
      tags.forEach((tag) =>{
        const counter = acc.find((c) => c.name == tag);
        if(counter){
          counter.count++;
        }
        else{
          acc.push({name:tag, count: 1});
        }
      });
      
      return acc;
      //return tags;
    },
    [] as {name: string; count: number}[],
     

  )
  .sort((a,b)=> a.name.localeCompare(b.name))
  ;
}
