import type { PropsWithChildren } from "react";

export function LinkList(props: PropsWithChildren<{ title: string }>) {
  return <>
  <div className="text-lg">{props.title}</div>
  <div className="text-sm">{props.children}</div>
  </>;
}
