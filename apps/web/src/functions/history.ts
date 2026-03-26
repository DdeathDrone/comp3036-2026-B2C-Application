export function history(posts: { date: Date; active: boolean }[]): { month: number, year: number, count: number}[] {
  // Implement per specification
  // Return the ordered list of "month, year" strings sorted from most recent to oldes
  // consider only active posts


  return posts
  .filter((p => p.active))
  .sort((a, b) => b.date.valueOf()- a.date.valueOf())
  .reduce(
    (acc, post) =>{
      const counter = acc.find((c) => c.month + "/" + c.year === (post.date.getMonth()+1) + "/" + post.date.getFullYear());
      if (counter){
        counter.count++;
      }
      else{
        acc.push({month: post.date.getMonth()+1, year: post.date.getFullYear(), count: 1} );
      }
      
      return acc;
    },
    [] as {month: number, year: number, count: number}[],
  );
}
