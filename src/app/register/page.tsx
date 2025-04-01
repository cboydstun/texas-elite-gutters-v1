import { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Texas Elite Gutters & Exteriors",
  description: "Create a new admin account",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Admin Account
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
