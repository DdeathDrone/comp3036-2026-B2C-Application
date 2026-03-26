// import { posts, type Post } from "../components/data";

export async function tags(posts: { tags: string; active: boolean }[]): Promise<{name: string, count: number}[]> {
  // TODO: Implement per specification

  return posts
  .filter((p=>p.active))
  .sort((a,b)=> a.tags.localeCompare(b.tags))
  .reduce(
    (acc, post) =>{
      const counter = acc.find((c) => c.name = post.tags);
      if(counter){
        counter.count++;
      }
      else{
        acc.push({name:post.tags, count: 1});
      }
      return acc;
    },
    [] as {name: string; count: number}[],
  );
}
