
import SignInForm from "@/components/auth/SignInForm";
import { Header1 } from "@/components/ui/header";

export default function SignIn() {
  return (
    <div className="min-h-screen">
      <Header1 />
      <div className="container max-w-6xl mx-auto py-20 px-4 pt-32">
        <SignInForm />
      </div>
    </div>
  );
}
