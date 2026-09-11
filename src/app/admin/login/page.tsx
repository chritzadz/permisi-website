"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { Eye, EyeOff, Lock, User } from "lucide-react";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAdminLogin();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/home");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      router.push("/admin/home");
    } else {
      setError(result.message || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-normal-creme flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg border border-normal-maroon/15 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-normal-creme rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-dark-maroon" />
            </div>
            <h1 className="text-3xl font-bold text-normal-maroon mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">Sign in to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-maroon" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-maroon focus:border-dark-maroon transition-colors"
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-maroon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-maroon focus:border-dark-maroon transition-colors"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-dark-maroon" />
                  ) : (
                    <Eye className="w-5 h-5 text-dark-maroon" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-normal-creme border border-normal-maroon/30 rounded-lg p-4">
                <p className="text-sm text-dark-maroon">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark-maroon text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
