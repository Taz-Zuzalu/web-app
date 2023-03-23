import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default function getUserSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient()

  (async function sbUserSession() {
    const currentSession = await supabase.auth.getSession();
    console.log("current session", currentSession);
    setSession(currentSession);

  })()

  return session
}
