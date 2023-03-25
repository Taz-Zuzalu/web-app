// templates/Home/index.tsx
import Head from "next/head"
import MainSection from "../../components/MainSection"

import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const HomeTemplate = ({ events }: Props) => (
    <BaseTemplate>
        <Head>
            <title>Home</title>
            <meta property="og:title" content="My new title" key="title" />
        </Head>

        <div className="flex flex-col w-full z-10">
            <MainSection events={events} />
        </div>
    </BaseTemplate>
)

export default HomeTemplate
