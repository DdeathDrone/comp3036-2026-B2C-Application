//import { client } from "@repo/db/client";
import { isLoggedIn } from "../utils/auth";
import styles from "./page.module.css";
import { products } from "@repo/db/data";
import { LoginPage } from "../components/LoginPage";
import { LogOutButton } from "../components/LogOutButton";
import { Filters } from "../components/Filters";
export default async function Home() {
  // use the is logged in function to check if user is authorised
  // we will use the cookie based approach
  const loggedIn = await isLoggedIn();
  //const posts = await client.db.post.findMany({include: {likes: true}});
  

  if (!loggedIn) {
    return <><main>Sign in to your account</main> <LoginPage></LoginPage></>;
  } else {
    return (
      <>
      <h1 className="text-2xl">Admin of B2C Application</h1>
      <main className={styles.main}>
        <Filters products={products}/>
        
        
      </main>
      <LogOutButton/> <a className="border px-1 rounded-md mb-2" href="/products/create">Create Product</a>
      </>
    );
  }
}
