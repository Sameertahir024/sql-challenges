"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async () => {
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
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
  };

  const signUpWithProvider = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 m-2"
      />
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
      <button onClick={handleSignUp} className="bg-blue-500 text-white p-2 m-2">
        Sign Up
      </button>
      <button
        onClick={() => signUpWithProvider("google")}
        className="bg-red-500 text-white p-2 m-2"
      >
        Sign Up with Google
      </button>
      <button
        onClick={() => signUpWithProvider("github")}
        className="bg-gray-800 text-white p-2 m-2"
      >
        Sign Up with GitHub
      </button>
    </div>
  );
}
