import type { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createServerSupabaseClient({ req, res })

    let userId = 0

    const {
        data: { session }
    } = await supabase.auth.getSession()

    try {
        if (session) {
            const response = await supabase.from("users").select().eq("uui_auth", session.user.id).single()
            console.log(response)

            // if (response.error === null) res.status(200).send({ userId: response.data.})
            // else res.status(response.status).send(response.error)
        }
    } catch (err) {
        userId = 0
        console.log(err)
        res.status(500).json({ statusCode: 500, message: err })
    }
}
