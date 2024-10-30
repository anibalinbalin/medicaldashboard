"use client";

import { useEffect, useState } from "react";
import { PatientRegistrationForm } from "../components/PatientRegistrationForm";
import AuthComponent from "../components/Auth";
import { supabase } from "../lib/supabase-auth";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-lg text-zinc-300">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-center mb-8 text-zinc-100">
            {session ? "Patient Registration" : "Medical Dashboard Login"}
          </h1>

          {session ? <PatientRegistrationForm /> : <AuthComponent />}
        </div>
      </div>
    </main>
  );
}
