import axios from "axios"

export function setupAPIClient(ctx = undefined) {
    const api = axios.create({
        baseURL: "https://22e4-200-158-93-216.sa.ngrok.io",
        headers: {
            "secret-key": process.env.SUPABASE_KEY as string
        }
    })

    return api
}
