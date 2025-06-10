"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Attempting login...");

      // Try to sign in
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      console.log("Login response:", { data, error: loginError });

      if (!loginError) {
        console.log("Login successful, redirecting to dashboard...");
        router.push("/dashboard");
      } else if (loginError.message === "Invalid login credentials") {
        console.log("Login failed, attempting signup...");
        // If login fails due to no user, try to sign up
        const { data: signupData, error: signupError } =
          await supabase.auth.signUp({
            email,
            password,
          });

        console.log("Signup response:", {
          data: signupData,
          error: signupError,
        });

        if (signupError) {
          alert(`Signup failed: ${signupError.message}`);
        } else {
          alert("Signup successful! Check your email to confirm.");
          // Optionally: auto-login user after signup
          const { error: loginAfterSignupError } =
            await supabase.auth.signInWithPassword({ email, password });
          if (!loginAfterSignupError) {
            router.push("/dashboard");
          }
        }
      } else {
        alert(`Login failed: ${loginError.message}`);
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      console.log(`Attempting ${provider} login...`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      console.log(`${provider} login response:`, { data, error });
      if (error) throw error;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      alert(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={isLoading}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login with Email"}
        </button>
        <button
          onClick={() => loginWithProvider("google")}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login with Google"}
        </button>
        <button
          onClick={() => loginWithProvider("github")}
          className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login with GitHub"}
        </button>
      </div>
    </div>
  );
}
