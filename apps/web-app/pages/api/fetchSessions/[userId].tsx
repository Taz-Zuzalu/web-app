import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  // Check if we have a session
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session)
  //   return res.status(401).json({
  //     error: "not_authenticated",
  //     description:
  //       "The user does not have an active session or is not authenticated",
  //   });

  try {
    const response = await supabase
      .from("sessions")
      .select("*, participants (*), favoritedSessions:favorited_sessions (*)")

      .eq("participants.user_id", req.query.userId)
      .eq("favoritedSessions.user_id", req.query.userId);
    if (response.error === null) res.status(200).send(response.data);
    else res.status(response.status).send(response.error);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
