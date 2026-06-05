"use server";

import ThemeSwitch from "../Themes/ThemeSwitcher";
import { toUrlPath } from "@repo/utils/url";
import Link from "next/link";
import { LoginButton } from "../Accounts/LoginButton";
import { LogOutButton } from "../Accounts/LogOutButton";
import { Search } from "./Search";
import { cookies } from "next/headers";
import { ProfileButton } from "../Accounts/ProfileButton";
import { CartPopup } from "../Checkout/CartPopup";
import { isLoggedIn } from "../../../utils/auth";

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export async function TopMenu({ query }: { query?: string }) {
  const userCookies = await isLoggedIn();
  return (
    <div className="fixed pl-30 inset-x-0 top-0 grid flex-1 grid-cols-4 bg-gray-400 h-10">
      <Search query={query}/>
      <div className="">
        <ThemeSwitch />

        {userCookies == undefined ?  <LoginButton /> : <><ProfileButton/> <LogOutButton/></>}
        <Link href={"/checkout"}>Checkout</Link>
        <div><CartPopup></CartPopup></div>
        

      </div>
    </div>
  );
}
