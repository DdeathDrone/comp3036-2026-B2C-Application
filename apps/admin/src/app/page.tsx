import { posts } from "@repo/db/data";
import { isLoggedIn } from "../utils/auth";
import styles from "./page.module.css";
import { LoginPage } from "../components/LoginPage";
import { LogOutButton } from "../components/LogOutButton";
import { AdminList } from "../components/AdminList";
export default async function Home() {
  // use the is logged in function to check if user is authorised
  // we will use the cookie based approach
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    return <><main>Sign in to your account</main> <LoginPage></LoginPage></>;
  } else {
    return (
      <>
      <h1 className="text-2xl">Admin of Full Stack Blog</h1>
      <main className={styles.main}>
        <ul>
          {posts.map((p) => (
            <li key={p.id}>
              <AdminList post={p}></AdminList>
            </li>
          ))}
        </ul>
        
      </main>
      <LogOutButton/>
      </>
    );
  }
}
