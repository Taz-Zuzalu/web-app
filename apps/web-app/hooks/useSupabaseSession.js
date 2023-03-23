import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

// eslint-disable-next-line import/prefer-default-export
export const useSession = () => {
  const [sessionToken, setSessionToken] = useState(null);
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      console.log(session)
      setSessionToken(session);
      console.log(sessionToken);
      const { data: authListener } = supabase.auth.onAuthStateChange(
        // eslint-disable-next-line @typescript-eslint/no-shadow
        (event, session) => {
          setSessionToken(session);
        }
      );

      return () => {
        authListener.unsubscribe();
      };
    })()
  }, [sessionToken]);

  return sessionToken;
};
