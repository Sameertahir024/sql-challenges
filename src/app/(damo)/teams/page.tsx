"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function TeamsPage() {
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
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Team Overview</h2>
          <p>Welcome to the Teams section. Here you can manage your team members and collaborate on projects.</p>
        </div>
        
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          <div className="space-y-2">
            <p>Currently no team members</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Add Team Member
            </button>
          </div>
        </div>
        
        <div className="p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Team Projects</h2>
          <p>No active projects</p>
        </div>
      </div>
    </div>
  );
}
