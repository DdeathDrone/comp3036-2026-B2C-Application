"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import {getCookie, setCookie} from 'cookies-next'
import { useRouter } from "next/navigation";



export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);


export const useTheme = () => {
  return useContext(ThemeContext);
}
export const ThemeProvider = ({children}: PropsWithChildren)=>{
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>(getCookie("theme")?.toString() == "light" ? "dark" : "light"); 
  const toggleTheme = () =>{
    //theme == "light" ? document.cookie = "theme=dark" : document.cookie = "theme=light"
    //setCookie("theme",theme)
    setTheme((t)=> (
      t == "light" ? "dark" : "light"
    ))
    
    

    
  };
  useEffect(() =>{
      setCookie("theme", theme.toString())
      router.refresh();
    },[theme])
  return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}