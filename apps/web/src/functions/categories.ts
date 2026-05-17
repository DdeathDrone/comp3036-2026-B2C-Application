// import { posts, type Post } from "../components/data";

export async function categories(posts: { categories: string; active: boolean }[]): Promise<{name: string, count: number}[]> {
  

  return posts
  .filter((p=>p.active))
  .reduce(
    (acc, post) =>{
     
      const cats = post.categories.split(",");
      cats.forEach((cat) =>{
        const counter = acc.find((c) => c.name == cat);
        if(counter){
          counter.count++;
        }
        else{
          acc.push({name:cat, count: 1});
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
