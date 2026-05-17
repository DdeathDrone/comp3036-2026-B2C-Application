import { ProductForm } from "../../../components/ProductForm";
import { isLoggedIn } from "../../../utils/auth";
import { LoginPage } from "../../../components/LoginPage";

export default async function Page() {
  const loggedIn = await isLoggedIn();
  
  if (!loggedIn) {
      return <><main>Sign in to your account</main> <LoginPage></LoginPage></>;
    } else {
     return <><ProductForm></ProductForm></>
    }
}