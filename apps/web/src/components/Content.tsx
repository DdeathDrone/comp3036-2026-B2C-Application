import type { PropsWithChildren } from "react";

export function Content({ children }: PropsWithChildren) {
  return <div className="pl-35 pt-5">{children}</div>;
}
