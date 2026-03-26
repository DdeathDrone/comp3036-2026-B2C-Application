import { history } from "@/functions/history";
import { type Post } from "@repo/db/data";
import { SummaryItem } from "./SummaryItem";

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function HistoryList({
  selectedYear,
  selectedMonth,
  posts,
}: {
  selectedYear?: string;
  selectedMonth?: string;
  posts: Post[];
}) {
  const historyItems = history(posts);

  // TODO: use the "history" function on "functions" directory to get the history
  //       and render all history items using the SummaryItem component
  return <div>{historyItems.map((item) =>(
    <SummaryItem
      key={item.month}
      name={months[item.month+1] + " " + item.year}
      link={`/history/${item.month}/${item.year}`}
      isSelected={false}
      title=""
      count={item.count}
    />
  ))}</div>;
}
