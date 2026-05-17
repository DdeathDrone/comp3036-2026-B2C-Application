import { LoginForm } from "@/components/Accounts/LoginForm";
import { AppLayout } from "@/components/Layout/AppLayout";

export default async function Page(){
    return <AppLayout><LoginForm></LoginForm></AppLayout>
}