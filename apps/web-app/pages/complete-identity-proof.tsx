import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useSemaphorePassportProof
} from "@pcd/passport-interface";
import axios from "axios"
// NEED TO INPUT THE CLIENT SUPABASE INSTANCE

async function setAuthStatus(proof: any) {

  if (proof) {
    try {
      console.log("log my proof", proof)
      const response = await axios({
        method: 'post',
        url: 'https://83df-189-203-105-58.ngrok.io/api/passport-user-login/',
        data: proof,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("You are not registered for Zuzalu")
  }
}

const RedirectPage: React.FC = () => {
  const [isHookResolved, setIsHookResolved] = useState(false);
  const router = useRouter();

  const { semaphoreProof, semaphoreProofValid } = useSemaphorePassportProof("https://api.pcd-passport.com/semaphore/1");

  useEffect(() => {

    if (semaphoreProof !== undefined) {
      // update the state once the hook is resolved
      setIsHookResolved(true);
    }
  },);

  useEffect(() => {
    // Do any necessary processing here
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    console.log("hook resolved", isHookResolved)
    if (isHookResolved) {
      (async () => {
        await setAuthStatus(semaphoreProof)
        console.log("Redirecting to index...");
      })()
      router.push("/");
    }
  }, [isHookResolved, semaphoreProof, semaphoreProofValid]);

  return (
    <div>
      <h1>Redirecting to index...</h1>
    </div>
  );
};

export default RedirectPage;
