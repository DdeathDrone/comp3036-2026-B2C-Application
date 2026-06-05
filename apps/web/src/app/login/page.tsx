import { LoginForm } from "@/components/Accounts/LoginForm";
import { AppLayout } from "@/components/Layout/AppLayout";
import { isLoggedIn } from "../../../utils/auth";
import { redirect } from "next/navigation";

export default async function Page(){

    const user = await isLoggedIn()
    if(user) return redirect("/");
    return <AppLayout><LoginForm></LoginForm></AppLayout>
}