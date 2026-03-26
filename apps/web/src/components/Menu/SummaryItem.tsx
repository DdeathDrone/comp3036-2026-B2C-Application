import Link from "next/link";
export function SummaryItem({
  name,
  link,
  count,
  isSelected,
  title,
}: {
  name: string;
  link: string;
  count: number;
  isSelected: boolean;
  title?: string;
}) {
  // TODO: Implement the summary item
  // must show the number of posts in that category and the name
  // if if is selected it must show in different color/background
  return <Link href={link}><li className={isSelected ? "bg-red-100" : "bg-transparent"}>  {name} {count} </li></Link>;
}
