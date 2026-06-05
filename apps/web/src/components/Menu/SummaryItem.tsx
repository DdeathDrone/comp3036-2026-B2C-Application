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
  return <div className="my-2"> <Link title={title} className={isSelected ? "bg-green-400 border px-2 rounded-md" : "bg-green-200 hover:bg-green-300 border px-2 rounded-md"} href={link} data-test-id="post-count">{name} - {count}</Link></div>;
}
