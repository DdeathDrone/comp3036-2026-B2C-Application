import { ProductForm } from "../../../components/ProductForm";
import { isLoggedIn } from "../../../utils/auth";
import { LoginPage } from "../../../components/LoginPage";
import { TopBar } from "../../../components/TopBar";

export default async function Page() {
  const loggedIn = await isLoggedIn();
  
  if (!loggedIn) {
      return <> <LoginPage></LoginPage></>;
    } else {
     return <>      <TopBar></TopBar> <ProductForm></ProductForm></>
    }
}