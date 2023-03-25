import { useEffect, useState, useRef } from "react"
import NextImage from "next/image"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import BaseTemplate from "../Base"
import Sessions from "../../components/Sessions/CalendarPageSessions"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import CalendarSessionModal from "../../components/CalendarSessionModal"
import StyledDatePicker from "../../components/StyledDatePicker"
import { EventsDTO, SessionsDTO } from "../../types"

const supabase = createBrowserSupabaseClient()

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
}

const MyProfilePage = ({ events, sessions }: Props) => {
    const { userInfo, userSessions, userParticipatingSessions, userRole } = useUserAuthenticationContext()
    const [eventsOpt, setEventsOpt] = useState<string[]>([])
    const [selectedOpt, setSelectedOpt] = useState<string[]>([])
    const [tickets, setTickets] = useState<any[]>([])
    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)
    const [filteredSessions, setFilteredSessions] = useState<SessionsDTO[]>(sessions)

    const isOrganizer = userRole === "resident"

    /* Begin DatePicker code */
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [datePickerDescription, setDatePickerDescription] = useState("FULL PROGRAM")
    const [datePickerStartDate, setDatePickerStartDate] = useState<Date | null>(null)
    const [datePickerEndDate, setDatePickerEndDate] = useState<Date | null>(null)
    const datePickerWrapperRef = useRef(null)

    const toggleDatePicker = () => {
        setOpenDatePicker(!openDatePicker)
    }

    const handleDateSelection = (selectedDates: [Date | null, Date | null]) => {
        // Filter sessions
        console.log("selectedDates: ", selectedDates)
        const [start, end] = selectedDates
        setDatePickerStartDate(start)
        setDatePickerEndDate(end)
        const filtered = sessions.filter((session) => {
            const sessionDate = new Date(session.startDate)
            sessionDate.setHours(0, 0, 0, 0) // Remove time part for date comparison
            const endOfDay = end ? new Date(end) : null
            if (endOfDay) {
                endOfDay.setHours(23, 59, 59, 999) // Set end date to end of day
            }
            return (start === null || start <= sessionDate) && (endOfDay === null || sessionDate <= endOfDay)
        })
        setFilteredSessions(filtered)
    }

    // Update filter header description
    // (done in useEffect because start and end date must be done updating first)
    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (datePickerStartDate?.getTime() === today.getTime() && datePickerEndDate?.getTime() === today.getTime()) {
            setDatePickerDescription("TODAY")
        } else if (datePickerStartDate?.getTime() === today.getTime()) {
            setDatePickerDescription("TODAY ONWARD")
        } else if (datePickerStartDate && datePickerEndDate === null) {
            setDatePickerDescription(`${moment(datePickerStartDate).format("MMMM D")} ONWARD`)
        } else if (
            datePickerStartDate &&
            datePickerEndDate &&
            datePickerStartDate.getTime() === datePickerEndDate.getTime()
        ) {
            setDatePickerDescription(moment(datePickerStartDate).format("dddd MMMM D"))
        } else if (datePickerStartDate && datePickerEndDate) {
            setDatePickerDescription(
                `${moment(datePickerStartDate).format("MMMM D")} - ${moment(datePickerEndDate).format("D")}`
            )
        }
    }, [datePickerStartDate, datePickerEndDate])

    const handleDatePickerClickOutside = (e: MouseEvent) => {
        const { current: wrap } = datePickerWrapperRef as { current: HTMLElement | null }

        if (wrap && !wrap.contains(e.target as Node)) {
            setOpenDatePicker(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleDatePickerClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleDatePickerClickOutside)
        }
    }, [])
    /* End DatePicker code */

    async function getUserTickets() {
        try {
            console.log(userInfo!.email)
            const supabaseResponse = await supabase.from("tickets").select("*").eq("email", userInfo!.email)
            console.log("my profile", supabaseResponse)
            if (!supabaseResponse.error) {
                setTickets(supabaseResponse.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userSessions.length > 0) {
            const eventsName = userSessions.map((item) => item.events).map((event) => event.name.replace("\n", ""))
            const uniqueValues = eventsName.filter((value, index, self) => self.indexOf(value) === index)
            getUserTickets()
            setEventsOpt(uniqueValues)
        }
    }, [userSessions])

    const filterByOptions = () => {
        const updatedFilteredSessions =
            selectedOpt.length > 0
                ? sortByDate.filter((item) => selectedOpt.includes(item.events.name.replace("\n", "")))
                : sortByDate
        setFilteredSessions(updatedFilteredSessions)
    }

    const handleOptionChange = (i: string) => {
        if (selectedOpt.includes(i)) {
            setSelectedOpt(selectedOpt.filter((item) => item !== i))
        } else {
            setSelectedOpt([...selectedOpt, i])
        }
        filterByOptions()
    }

    const sortByDate = userSessions.sort((a, b) => (new Date(a.startDate) as any) - (new Date(b.startDate) as any))

    return (
        <BaseTemplate>
            {/* <div className="flex flex-col bg-[#EEEEF0] px-6 sm:px-12 md:px-[24px] py-6 sm:py-12 md:py-[24px] gap-4 sm:gap-8 md:gap-[16px]"> */}
            <div className="flex flex-col bg-[#EEEEF0] px-4 md:px-[24px] py-4 md:py-[24px] gap-4 md:gap-[16px]">
                <div className="flex flex-col sm:flex-row justify-between p-5 bg-white w-full rounded-[8px] flex-wrap">
                    {/* <div className="flex items-center w-full md:w-auto mb-4 md:mb-0"> */}
                    <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mb-4 md:mb-0 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                            <NextImage src={"/user-icon-5.svg"} alt="calendar" width={24} height={24} />
                            <p className="font-bold capitalize">{userInfo && userInfo.userName}</p>
                        </div>
                        <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                            <NextImage src={"/vector-location.svg"} alt="location" width={24} height={24} />
                            <p>Ho Chi Minh City</p>
                        </div>
                        <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                            <NextImage src={"/vector-computer.svg"} alt="location" width={24} height={24} />
                            <p>Ethereum Foundation</p>
                        </div>
                    </div>
                </div>
                <CalendarSessionModal
                    closeModal={setOpenAddSessionModal}
                    isOpen={openAddSessionModal}
                    events={events}
                    sessions={sessions}
                />
                <div className="flex flex-col md:flex-row justify-between h-full">
                    <div className="p-5 flex flex-col items-start bg-white rounded-[8px] w-full md:w-4/6 gap-[8px]">
                        <div className="flex flex-col justify-between w-full gap-[16px]">
                            <div className="flex items-center gap-10">
                                <h1 className="font-semibold text-[40px]">My Sessions</h1>
                                {isOrganizer && (
                                    <button
                                        onClick={() => setOpenAddSessionModal(true)}
                                        className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] h-[40px]"
                                    >
                                        CREATE SESSION
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-col items-start p-[2px] gap-[16px]">
                                <Sessions sessions={filteredSessions} showStartDate={true} />
                                {/* <h1>placeholder</h1> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pl-0 md:pl-5 w-full md:w-2/6 gap-10 mt-10 md:mt-0">
                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                            <h1 className="text-[24px] font-semibold">My Sessions</h1>
                            <div className="flex gap-2 flex-col items-start justify-center">
                                {eventsOpt &&
                                    eventsOpt.map((item, index) => (
                                        <label
                                            key={index}
                                            className="flex w-auto items-center gap-2 capitalize text-[16px] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name="checkbox"
                                                value="value"
                                                checked={selectedOpt.includes(item)}
                                                onChange={() => handleOptionChange(item)}
                                            />
                                            {item}
                                        </label>
                                    ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                            <h1 className="text-[24px] font-semibold">My Tickets</h1>
                            <div className="flex gap-2 flex-col justify-center items-start">
                                {tickets &&
                                    tickets.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 cursor-pointer w-auto">
                                            <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                            <Link href={item.pdf_link}>
                                                <a
                                                    className="capitalize border-b border-[#52B5A4] text-[16px]"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default MyProfilePage
