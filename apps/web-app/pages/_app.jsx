// import type { AppProps } from "next/app"
import React, {useEffect, useState} from "react"
import { useRouter } from "next/router"
import { IdentityContextProvider } from "../context/IdentityContextProvider"
import { UserIdentityProvider } from "../context/UserIdentityContext"
import { createClient } from "@supabase/supabase-js";
import "../styles/globals.css"
import "../styles/drawingComponent.css"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const MyApp = ({ Component, pageProps }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(null)
  const router = useRouter();

  async function checkSession() {
    const user = await supabase.auth.getSession();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user.data.session ? setUserLoggedIn(user.data) : setUserLoggedIn(null);
    console.log()
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    async () => {
      checkSession();
    }

  }, []);

  return(
      <IdentityContextProvider>
        <UserIdentityProvider>
            <Component userLoggedIn={userLoggedIn} {...pageProps} />
        </UserIdentityProvider>
    </IdentityContextProvider>
    )
}

export default MyApp
