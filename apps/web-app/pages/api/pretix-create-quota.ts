import { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import authMiddleware from "../../hooks/auth"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Create Quota Triggered", req.query.slug, req.body)
    const auth = process.env.NEXT_PUBLIC_PRETIX_API
    const headers = {
        Accept: "application/json, text/javascript",
        Authorization: `Token ${auth}`,
        "Content-Type": "application/json"
    }

    const { ticketAmount, subEventId, slug, itemId } = req.body

    const body = {
        name: `Ticket Quota`,
        size: `${ticketAmount}`,
        items: [itemId],
        variations: [],
        subevent: subEventId,
        close_when_sold_out: false,
        closed: false
    }

    try {
        const response = await axios.post(
            `https://beta.ticketh.xyz/api/v1/organizers/zuzalu/events/${slug}/quotas/`,
            body,
            { headers }
        )

        console.log("quota response: ", response)

        if (response.status === 201) {
            res.status(201).json(response.data)
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export default authMiddleware(handler)
