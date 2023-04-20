import moment from "moment"
import NextImage from "next/image"
import { IoMdArrowBack } from "react-icons/io"
import { Parser } from "html-to-react"

import Loading from "../Loading"

type NewSessionState = {
    description: string
    equipment: string
    event_id: number
    event_item_id: number
    event_slug: string
    event_type: string
    format: string
    hasTicket: boolean
    info: string
    level: string
    location: string
    custom_location: string
    name: string
    startDate: Date
    duration: string
    startTime: string
    subevent_id: number
    tags: string[]
    team_members: {
        name: string
        role: string
    }[]
    track: string
}

type Props = {
    setSteps: (step: number) => void
    newSession: NewSessionState
    handleSubmit: Function
    isLoading: boolean
    amountTickets: string
}

const Step3 = ({ setSteps, newSession, handleSubmit, isLoading }: Props) => {
    const parser = new Parser()
    const reactContent = parser.parse(newSession.description)
    return (
        <div className="flex flex-col w-full gap-8 bg-white rounded-lg">
            <div className="flex flex-col gap-4">
                <h1 className="text-[24px] font-[600]">{newSession.name}</h1>
                <h1 className="text-[18px]">{reactContent}</h1>

                <div className="flex items-center gap-2">
                    <NextImage src="/vector-calendar.svg" width={20} height={20} />
                    <h1>{moment(newSession.startDate).format("dddd, MMMM DD")}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <NextImage src="/vector-clock.svg" width={20} height={20} />
                    <h1 className="text-[18px]">{newSession.startTime}</h1>
                </div>

                <div className="flex items-center gap-2">
                    <NextImage src="/vector-location.svg" width={20} height={20} />
                    <h1 className="text-[18px]">
                        {newSession.location === "Other" ? newSession.custom_location : newSession.location}
                    </h1>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-row gap-[8px]">
                        <p className="w-[103px] font-[700] text-[#1C2928] text-[18px]">Organizers</p>
                        <div className="flex flex-row items-center">
                            {newSession.team_members
                                .filter((item) => item.role === "Organizer")
                                .map((item, index) => (
                                    <p key={index} className="font-[400] text-[18px]">
                                        {(index ? ", " : "") + item}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 justify-center items-center mt-5">
                <button
                    type="button"
                    className="w-full flex flex-row border-zulalu-primary border font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-white rounded-[8px] text-black text-[16px]"
                    onClick={() => setSteps(1)}
                >
                    <IoMdArrowBack size={20} />
                    BACK
                </button>
                <button
                    type="button"
                    disabled={isLoading}
                    className="w-full flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                    onClick={() => handleSubmit()}
                >
                    {isLoading ? <Loading size="xs" /> : "EDIT SESSION"}
                </button>
            </div>
        </div>
    )
}

export default Step3
