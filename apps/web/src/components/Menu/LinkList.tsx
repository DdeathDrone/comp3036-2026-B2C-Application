import type { PropsWithChildren } from "react";

export function LinkList(props: PropsWithChildren<{ title: string }>) {
  return <>
  {props.title}
  <li>{props.children}</li>
  </>;
}
