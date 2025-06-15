"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function ChahhagamaPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching session data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSessionData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4">Please log in to view this page</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chahhagama's Page</h1>
      <div className="p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Welcome</h2>
        <p>Hello, {user.email}</p>
      </div>
    </div>
  );
}
