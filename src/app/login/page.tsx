import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Texas Elite Gutters & Exteriors",
  description: "Login to your admin account",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
