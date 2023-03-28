import { NextApiRequest, NextApiResponse } from "next";
import { useSemaphorePassportProof } from "@pcd/passport-interface";
import { sha256 } from "js-sha256";
import { verifyProof } from "@semaphore-protocol/proof";
import axios from 'axios';
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const supabase = createServerSupabaseClient({ req, res });

  const signInWithSemaphoreProof = async (proof: any) => {
    // IMPORTANT!!!! User Email must be changed
    // Validate Proof of user before interacting with DB

    const proofValid = await verifyProof(proof.proof.proof, proof.claim.group.depth);

    if (proofValid) {
      const userDetailsRes = await axios.get(`https://api.pcd-passport.com/zuzalu/participant/${UUID}`);
      const { uuid, commitment, email, name, role, residence, order_id } = userDetailsRes.data

      const email = "danilowhk@gmail.com";
      const password = process.env.SINGLE_KEY_LOGIN!;
      try {
        // Get Email from endpoint
        const signIn = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signIn.error) {
          const signUp = await supabase.auth.signUp({ email, password });
          res.status(200).json(signUp.data.user);
        } else {
          res.status(200).json(signIn.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(403).json("Proof not valid");
    }
  };

  signInWithSemaphoreProof(req.body);
}
