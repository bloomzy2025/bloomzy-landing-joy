
import SignInForm from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function SignIn() {
  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/">
            <Home size={16} />
            Back to Home
          </Link>
        </Button>
      </div>
      <SignInForm />
    </div>
  );
}
