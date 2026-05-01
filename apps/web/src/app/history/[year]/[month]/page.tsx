import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";
//import { posts } from "@repo/db/data";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const {year, month} = await params;
  const date = new Date(parseInt(year), parseInt(month)-1); // Date value defaults to 31st, anything greater than 31 of last month is from selected month
  const date2 = new Date(parseInt(year), parseInt(month)); // Range of 1 month is between these 2 dates.
  //const postsInDate = posts.filter(post => String(post.date.getMonth()+1) === month && String(post.date.getFullYear()) === year);
  const postsInDate = await client.db.post.findMany({where:{date: {gt: date, lt: date2 }, active:true}, include: {likes: true}});
  return (
    <AppLayout>
      <Main posts={postsInDate.length == 0 ? [] : postsInDate} />
    </AppLayout>
  );
}
