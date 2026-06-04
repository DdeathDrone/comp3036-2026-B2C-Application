"use server"
import jwt from "jsonwebtoken";
import { env } from "@repo/env/web";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isLoggedIn() { //TODO: Change Name
  const userCookies = await cookies();

  
  //const token = userCookies.get("auth_token")?.value;

  const token = userCookies.get("auth_token");
  
    if(!token){
      redirect("/");
    }
    try{
      const user = await jwt.verify(token.value, env.JWT_SECRET) as jwt.JwtPayload; //TODO: Move to API when implementing backend
      return user;
    }
    catch (err){
      const response = await fetch(`http://localhost:3001/api/auth`, {
        method: "DELETE",
      });
      
   }
  //try{token && jwt.verify(token, env.JWT_SECRET || ""); return token && jwt.verify(token, env.JWT_SECRET || "")}
  //catch{return false}
}
