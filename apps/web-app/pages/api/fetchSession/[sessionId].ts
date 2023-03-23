import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  try {
    const userId =
      req.query.userId === undefined
        ? 0
        : ((req.query.userId as unknown) as number);

    const response = await supabase
      .from("sessions")
      .select("*, participants (*), favorited_sessions (*)")
      .eq("id", req.query.sessionId)
      .eq("participants.user_id", userId)
      .eq("favorited_sessions.user_id", userId);
    if (response.error === null) res.status(200).send(response.data);
    else res.status(response.status).send(response.error);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
