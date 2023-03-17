import React, {useEffect, useState} from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { createClient } from '@supabase/supabase-js'
import MyProfileComponent from "../components/MyProfile"
import { FavoritedEventsDTO, ParticipantsDTO, UserDTO } from "../types"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

type Props = {
    pastEvents: ParticipantsDTO[]
    attendingEvents: ParticipantsDTO[]
    userEventsFavorited: FavoritedEventsDTO[]
    userInfo: UserDTO | undefined
}

export default function MyProfile({ pastEvents, attendingEvents, userEventsFavorited, userInfo }: Props) {
  const [UserLoggedIn, setUserLoggedIn] = useState<any>(null)
  const router = useRouter();

  async function checkSession() {
    const user = await supabase.auth.getSession();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user.data.session ? setUserLoggedIn(user.data) : setUserLoggedIn(null);
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (async () => {checkSession()})()

    if (!UserLoggedIn) router.push("/");
  }, [UserLoggedIn]);
  return (
        <MyProfileComponent
            pastEvents={pastEvents}
            attendingEvents={attendingEvents}
            userEventsFavorited={userEventsFavorited}
            userInfo={userInfo}
        />
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    try {
        const url = process.env.URL_TO_FETCH
        const usersResult = await fetch(`${url}/api/fetchUsers`)
        const participantsResult = await fetch(`${url}/api/fetchParticipants`)
        const usersFavoriteEventsResult = await fetch(`${url}/api/fetchFavoritedEvents`)

        const usersData: UserDTO[] = await usersResult.json()
        const participantsData: ParticipantsDTO[] = await participantsResult.json()
        const usersFavoriteData: FavoritedEventsDTO[] = await usersFavoriteEventsResult.json()

        // mocked user for now (fetching user 1 from db)
        // since we implement user authentication in the server side, we need to fetch user dinamically
        const userEvents = participantsData.filter((item) => item.user_id === 1)
        const userEventsFavorited = usersFavoriteData.filter((item) => item.user_id === 1)
        const pastEvents = userEvents.filter((item) => {
            const todayDate = new Date().getTime()
            const eventDate = new Date(item.events.endDate).getTime()
            if (todayDate > eventDate) {
                return item
            }
        })
        const attendingEvents = userEvents.filter((item) => {
            const todayDate = new Date().getTime()
            const eventDate = new Date(item.events.endDate).getTime()
            if (todayDate < eventDate) {
                return item
            }
        })
        const userInfo = usersData.find((item) => item.id === 1)

        return {
            props: { pastEvents, attendingEvents, userEventsFavorited, userInfo }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
