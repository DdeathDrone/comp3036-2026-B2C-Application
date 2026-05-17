//import { posts } from "@repo/db/data";
import { ProductForm } from "../../../components/ProductForm";
import { isLoggedIn } from "../../../utils/auth";
import { LoginPage } from "../../../components/LoginPage";
import { products } from "@repo/db/data";
//import { client } from "@repo/db/client";

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
      const productDetails = products.find((p)=>(p.urlId == urlId))
      //const postDetails = await client.db.post.findUnique({where: {urlId: urlId}, include: {likes: true}})
     return <>{productDetails == undefined ? "Article Not found" : <ProductForm product={productDetails}></ProductForm>}</>
    }
}