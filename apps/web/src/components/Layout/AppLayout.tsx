import type { PropsWithChildren } from "react";
import { Content } from "../Content";
import { LeftMenu } from "../Menu/LeftMenu";
import { TopMenu } from "./TopMenu";
import { ThemeProvider } from "../Themes/ThemeContext";
import { CartPopupProvider } from "../Checkout/CartPopupContext";

export async function AppLayout({
  children,
  query,
  selected,
}: PropsWithChildren<{ query?: string, selected?: string }>) {
  return (
    <div className="">
    <ThemeProvider>
    <CartPopupProvider>
      <TopMenu query={query} />
      <LeftMenu selected={selected}/>
      <Content>
        
        {children}
      </Content>
    </CartPopupProvider>
    </ThemeProvider>
    </div>
  );
}
