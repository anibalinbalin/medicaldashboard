"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { supabase } from "../lib/supabase-auth";

export default function AuthComponent() {
  return (
    <div className="max-w-md mx-auto p-6">
      <LoginForm />
    </div>
  );
}
