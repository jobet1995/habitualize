import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/auth/sign-up";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
