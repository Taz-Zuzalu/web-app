import { useState, useEffect } from "react"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { createClient } from '@supabase/supabase-js'
import AddEventModal from "../../components/AddEventModal"
import YellowCircle from "../../components/svgElements/YellowCircle"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import BackTAZ from "../../components/ArrowNavigators/BackTAZ"
import Footer from "../../components/Footer"
import Calendar from "../../components/Calendar"
const supabaseUrl = "https://polcxtixgqxfuvrqgthn.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey as string)

import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

export default function Events({ events }: Props) {
    const [openAddEventModal, setOpenAddEventModal] = useState(false)
    const [userLoggedIn, setUserLoggedIn] = useState<any>(null)

    async function checkSession() {
      const user = await supabase.auth.getSession();
      console.log("user", user);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      user.data.session ? setUserLoggedIn(user.data) : setUserLoggedIn(null);
    }

    useEffect(() => {
      // Set up scroll listening for scroll to top button
      checkSession()
  }, [])

    return (
        <div className="min-h-[700px] relative overflow-hidden h-auto flex flex-col">
            <div className="fixed top-[25%] -left-[14%]">
                <YellowCircle />
            </div>
            <div className="fixed top-[62%] right-[-35%]">
                <Ellipse color="#435C6C" />
            </div>
            <div className="fixed top-[70%] left-[2%]">
                <RedCircle />
            </div>
            {userLoggedIn ?
            <div className="fixed bottom-[15%] right-2 z-20 flex justify-end">
                <button
                    type="button"
                    className="rounded-full bg-brand-yellow ring-2 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
                    onClick={() => setOpenAddEventModal(true)}
                >
                    Add an event
                </button>
            </div> : ''}

            <AddEventModal closeModal={setOpenAddEventModal} isOpen={openAddEventModal} />

            <div className="z-10 ">
                <Link href="/experiences-page">
                    <div className="flex max-w-[76px] max-h-[32px] bg-black ml-8 mt-8 mb-7 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
                        <BackTAZ />
                        <h1>TAZ</h1>
                    </div>
                </Link>
                <div className="px-6 pb-4">
                    <div className="flex flex-col w-full pt-5 pb-2">
                        <h2 className="ml-2 text-2xl leading-5 font-extrabold">Check events</h2>
                    </div>
                    <p className="ml-2 text-brand-info text-brand-blue">Check on going events (Sample text)</p>
                </div>
            </div>

            <div className="z-10 px-6 pb-8">
                <div className="min-w-[200px] relative divide-y overflow-y-auto rounded-md border-2 border-brand-blue bg-white drop-shadow-lg">
                    <Calendar events={events} />
                </div>
            </div>

            <div className="flex w-full relative justify-center bg-black pb-3 pt-9">
                <Footer />
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const eventsResponse = await fetch(`${url}/api/fetchEvents`)
        const events = await eventsResponse.json()
        return {
            props: { events }
        }
    } catch (error) {
        res.statusCode = 404
        return {
            props: {}
        }
    }
}
