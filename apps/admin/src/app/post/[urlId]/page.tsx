import { posts } from "@repo/db/data";
import { PostForm } from "../../../components/PostForm";
import { isLoggedIn } from "../../../utils/auth";
import { LoginPage } from "../../../components/LoginPage";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const loggedIn = await isLoggedIn();
  
  if (!loggedIn) {
      return <><main>Sign in to your account</main> <LoginPage></LoginPage></>;
    } else {
      const { urlId } = await params;
      const postDetails = posts.find((post)=>(post.urlId == urlId))
     return <>{postDetails == undefined ? "Article Not found" : <PostForm post={postDetails}></PostForm>}</>
    }
}