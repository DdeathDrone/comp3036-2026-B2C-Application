import { SignUpForm } from "@/components/Accounts/SignUpForm";
import { AppLayout } from "@/components/Layout/AppLayout";

export default async function Page(){
    return <AppLayout><SignUpForm></SignUpForm></AppLayout>
}