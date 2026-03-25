export function history(posts: { date: Date; active: boolean }[]): { date: string, count: number}[] {
  // Implement per specification
  // Return the ordered list of "month, year" strings sorted from most recent to oldes
  // consider only active posts


  // modified the above instructions to return a count as well
  return posts
  .filter((p => p.active))
  .sort((a, b) => b.date.valueOf()- a.date.valueOf())
  .reduce(
    (acc, post) =>{
      const counter = acc.find((c) => c.date === post.date.getMonth() + "/" + post.date.getFullYear());
      if (counter){
        counter.count++;
      }
      else{
        acc.push({date: post.date.getMonth() + "/" + post.date.getFullYear(), count: 1} );
      }
      
      return acc;
    },
    [] as {date: string, count: number}[],
  );
}
