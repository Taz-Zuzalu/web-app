// pages/api/user_by_id.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const userData = await supabase.from("users").select("*").eq("id", id);

      if (!userData.error) {
        res.status(200).json(userData.data);
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Unable to get user by ID" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
