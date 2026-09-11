"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import LoadingSpinner from "@/components/loadingSpinner";

interface AdminLoginGuardProps {
  children: React.ReactNode;
}

const AdminLoginGuard = ({ children }: AdminLoginGuardProps) => {
  const { isAuthenticated, isLoading } = useAdminLogin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname.startsWith('/admin') && pathname !== '/admin/login') {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-normal-creme flex flex-col items-center justify-center gap-4">
        <LoadingSpinner size={36} />
        <p className="text-sm text-dark-maroon">Checking session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AdminLoginGuard;
