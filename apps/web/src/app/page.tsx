//import { posts } from "@repo/db/data";
import {client} from "@repo/db/client";
import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import styles from "./page.module.css";
export default async function Home() {
  return (
    <AppLayout>
      <Main posts={ await client.db.post.findMany({include: {likes: true}})} className={styles.main} />
    </AppLayout>
  );
}
