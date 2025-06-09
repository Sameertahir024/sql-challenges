"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Try to sign in
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!loginError) {
      router.push("/dashboard");
    } else if (loginError.message === "Invalid login credentials") {
      // If login fails due to no user, try to sign up
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
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
  };

  const loginWithProvider = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 m-2">
        Login / Signup with Email
      </button>
      <button
        onClick={() => loginWithProvider("google")}
        className="bg-red-500 text-white p-2 m-2"
      >
        Google
      </button>
      <button
        onClick={() => loginWithProvider("github")}
        className="bg-gray-800 text-white p-2 m-2"
      >
        GitHub
      </button>
    </div>
  );
}
