import LoginForm from "../_components/LoginForm";
import { signIn, providerMap } from "@/auth";

export default function LoginPage() {
  return (
    <div className="container flex justify-center items-center h-screen bg-gray-50">
      <LoginForm />

      
    </div>
  );
}
