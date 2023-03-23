import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"

// eslint-disable-next-line import/prefer-default-export
export const getUserOnID = () => {
  const [userObj, setUserObj] = useState(null);
  const supabase = createBrowserSupabaseClient()

  useEffect(() => {
    (async () => {
      const id = window.localStorage.getItem("id")
      const userData = await supabase.from('users').select("*").eq("id", id)
      if (!userData.error) {
        setUserObj(userData)
      }

    })()
  }, []);

  return userObj;
};
