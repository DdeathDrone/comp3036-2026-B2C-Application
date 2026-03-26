// import { posts, type Post } from "../components/data";

export async function tags(posts: { tags: string; active: boolean }[]): Promise<{name: string, count: number}[]> {
  // TODO: Implement per specification

  return posts
  .filter((p=>p.active))
  //.sort((a,b)=> a.tags.localeCompare(b.tags))
  .reduce(
    (acc, post) =>{
      /*const tags = post.tags.split(",").reduce(
        (tagAcc, tag) =>{
          const count = tagAcc.find((c) => c.name = tag);
          if(count){
            count.count++;
          }
          else{
            tagAcc.push({name: tag, count: 1});
          }
          return tagAcc;
        },
        [] as {name: string; count: number}[],
      );*/
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
  //.sort((a,b)=> a.name.localeCompare(b.name))
  ;
}
