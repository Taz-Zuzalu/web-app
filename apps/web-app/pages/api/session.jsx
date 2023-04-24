// pages/api/session.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await supabase.auth.getSession();
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({ message: "Unable to get session" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
