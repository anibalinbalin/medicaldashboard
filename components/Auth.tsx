"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabase-auth";

export default function AuthComponent() {
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          extend: true,
          variables: {
            default: {
              colors: {
                brand: "#24b47e",
                brandAccent: "#1ea16d",
                inputBackground: "#18181b",
                inputBorder: "#27272a",
                inputText: "white",
                buttonBackground: "#27272a",
                buttonBackgroundHover: "#3f3f46",
                buttonBorder: "#27272a",
                buttonText: "white",
              },
            },
          },
          className: {
            input: "!bg-[#18181b] !text-white border-[#27272a]",
            label: "!text-zinc-400",
            button: "!bg-[#27272a] hover:!bg-[#3f3f46]",
          },
        }}
        providers={["google", "github"]}
        redirectTo={
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback`
            : undefined
        }
      />
    </div>
  );
}
