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
  const userCookies = await isLoggedIn(); //bg-[#52B1FF]
  return (
    
    <div className="fixed block border-b-2 bg-blue-300 inset-x-0 top-0 h-15"> 
        
      <Link className="float-left mt-3 mr-3 ml-2 text-2xl"href="/">B2C Store</Link>

      <Search query={query}/>
      {/* <div className="float-right"> */}
      <div className="float-right mt-1 border rounded-md p-2 w-25 text-center mr-10 text-black text-lg bg-blue-100 hover:bg-blue-300" >
          <Link href={"/checkout"}>Checkout</Link>
        </div>
        
        <div className=" ">
          {userCookies == undefined ?  <div className="float-right mt-1 mr-10 p-2 border w-25 text-center rounded-md text-lg text-black bg-blue-100 hover:bg-blue-300"><LoginButton /> </div> 
          : <><div className="float-right mt-1 mr-10 p-2 border w-25 text-center rounded-md text-lg text-black bg-red-400 hover:bg-red-600 "> <LogOutButton/></div>
          <div className="float-right mt-1 mr-10 p-2 border w-25 text-center rounded-md text-lg text-black bg-blue-100 hover:bg-blue-300"><ProfileButton/> </div> </>}
        </div>
        <div className="float-right mr-10 mt-1 border rounded-md p-2 w-40 text-center mr-10 text-lg bg-blue-100 hover:bg-blue-300"  >
          <ThemeSwitch />
        </div>
        
        <div><CartPopup></CartPopup></div>
        

      {/* </div> */}
    </div>
  );
}
