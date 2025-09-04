"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminLogin } from "@/hooks/useAdminLogin";

interface AdminLoginGuardProps {
  children: React.ReactNode;
}

const AdminLoginGuard = ({ children }: AdminLoginGuardProps) => {
  const { isAuthenticated, isLoading } = useAdminLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    <div className="min-h-screen bg-normal-creme flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AdminLoginGuard;
