import { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import authMiddleware from "../../hooks/auth"
// import fetch from "node-fetch"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createServerSupabaseClient({ req, res })

    const {
        data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
        return res.status(401).json({
            error: "not_authenticated",
            description: "The user does not have an active session or is not authenticated"
        })
    }

    const user = await supabase.from("users").select().eq("uui_auth", session.user.id).single()

    if (session) {
        try {
            const { location, company, bio } = req.body

            await supabase.from("user_profiles").insert({
                location,
                company,
                bio,
                user_id: user.data!.id
            })

            res.status(201).json("User Profile created")
        } catch (error) {
            console.log("error: ", error)
            res.status(500).json({ statusCode: 500, message: error })
        }
    }
}

export default authMiddleware(handler)
