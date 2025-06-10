"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(user);
        setSession(session);
      } catch (error) {
        console.error("Error fetching session data:", error);
      } finally {
        setLoading(false);
      }
    };

    getSessionData();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4">Please log in to view this page</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-4">
        {/* User Information Card */}
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">User ID:</span> {user.id}
            </p>
            <p>
              <span className="font-medium">Last Sign In:</span>{" "}
              {new Date(user.last_sign_in_at || "").toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Created At:</span>{" "}
              {new Date(user.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Email Confirmed:</span>{" "}
              {user.email_confirmed_at ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Session Information Card */}
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Session Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Access Token:</span>{" "}
              <span className="text-xs break-all">{session?.access_token}</span>
            </p>
            <p>
              <span className="font-medium">Refresh Token:</span>{" "}
              <span className="text-xs break-all">
                {session?.refresh_token}
              </span>
            </p>
            <p>
              <span className="font-medium">Expires At:</span>{" "}
              {session?.expires_at
                ? new Date(session.expires_at * 1000).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Provider:</span>{" "}
              {session?.provider_token ? "OAuth" : "Email"}
            </p>
          </div>
        </div>

        {/* App Metadata Card */}
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">App Metadata</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Provider:</span>{" "}
              {user.app_metadata.provider || "email"}
            </p>
            <p>
              <span className="font-medium">Providers:</span>{" "}
              {user.app_metadata.providers?.join(", ") || "email"}
            </p>
          </div>
        </div>

        {/* User Metadata Card */}
        <div className="shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Metadata</h2>
          <pre className=" p-4 rounded overflow-auto">
            {JSON.stringify(user.user_metadata, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
