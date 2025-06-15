"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function OverviewPage() {
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
      
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>
          <p>Hello, {user.email}</p>
        </div>
        
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <div className="space-y-2">
            <p>Your account is active</p>
            <p>Last login: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <p>No recent activity to display</p>
        </div>
      </div>
    </div>
  );
}
