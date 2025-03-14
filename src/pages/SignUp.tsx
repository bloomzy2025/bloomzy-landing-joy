
import SignUpForm from "@/components/auth/SignUpForm";
import { Header1 } from "@/components/ui/header";

export default function SignUp() {
  return (
    <div className="min-h-screen">
      <Header1 />
      <div className="container max-w-6xl mx-auto py-20 px-4 pt-32">
        <SignUpForm />
      </div>
    </div>
  );
}
