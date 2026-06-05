import { client } from "@repo/db/client";
import { isLoggedIn } from "../utils/auth";
import styles from "./page.module.css";
import { products } from "@repo/db/data";
import { LoginPage } from "../components/LoginPage";
import { LogOutButton } from "../components/LogOutButton";
import { Filters } from "../components/Filters";
import { TopBar } from "../components/TopBar";
export default async function Home() {
  // use the is logged in function to check if user is authorised
  // we will use the cookie based approach
  const loggedIn = await isLoggedIn();
  //const posts = await client.db.post.findMany({include: {likes: true}});
  

  if (!loggedIn) {
    return <><LoginPage></LoginPage></>;
  } else {
    return (
      <>
      <TopBar></TopBar>
      <main className="mt-5">
        <Filters products={await client.db.product.findMany()}/>
        
        
      </main>
      </>
    );
  }
}
