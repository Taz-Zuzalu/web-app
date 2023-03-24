import Image from "next/image"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import { usePassportModalContext } from "../../context/PassportModalContext"
import getUserSession from "../../hooks/getUserSession"
import { getUserOnID } from "../../hooks/getUserOnID"
import WhiteGlobeVector from "./WhiteGlobeVector"

const supabase = createBrowserSupabaseClient()

const MainSection = () => {
    const { openPassportModal, setOpenPassportModal } = usePassportModalContext()
    const userObj = getUserSession()
    console.log("user object new", userObj)

    const PASSPORT_URL = "https://zupass.eth.limo/"

    function requestProofFromPassport(proofUrl: string) {
        const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`
        window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup")
    }

    function requestSignedZuID() {
        const proofUrl = requestSignedZuzaluUUIDUrl(PASSPORT_URL, `${window.location.origin}/popup`)
        requestProofFromPassport(proofUrl)
    }
    return (
        <div className="relative flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10 ">
            <div className="intro flex flex-col md:flex-row min-h-[90vh] h-full w-full relative ">
                {/* <button onClick={requestSignedZuID}> Passport </button> */}
                <div
                    className="absolute top-0 h-full w-full bg-no-repeat "
                    style={{ background: "#FFFFFF", opacity: 0.8, borderRadius: "16px" }}
                ></div>
                <div className="absolute right-0 bottom-40 w-[950px] h-[660px] z-3">
                    {/* bunch of images section */}
                    {/* Green gradient circle */}
                    <div
                        className="absolute w-[544.69px] h-[488px] left-[251.53px] top-[31px]"
                        style={{
                            background: "rgba(212, 249, 232, 0.9)",
                            filter: "blur(150px)"
                        }}
                    ></div>
                    {/* Yellow gradient circle */}
                    <div
                        className="absolute w-[478px] h-[379px] left-[218px] top-[220px]"
                        style={{
                            background: "rgba(247, 222, 55, 0.9)",
                            filter: "blur(150px)"
                        }}
                    ></div>
                    {/* SVG image */}
                    <WhiteGlobeVector className="absolute w-[536.07px] h-[508.6px] left-[265.25px] top-[72px]" />
                    <div
                        className="absolute w-[50%] md:w-[476px] h-[50vh] md:h-[436px] left-1/2 md:left-[369px] top-1/2 md:top-[147px]"
                        style={{
                            backgroundImage: 'url("image49.png")'
                        }}
                    ></div>
                </div>
                {/* text section */}
                <div className="z-[11] flex w-full px-[10px] md:px-[72px] py-[30px] md:py-[180px] ">
                    <div className="flex w-[700px] flex-col gap-5">
                        {/* <h1 className="font-semibold text-[30px] md:text-[60px] md:mb-10"> */}
                        <h1 className="font-semibold text-[24px] md:text-[60px] md:mb-10">
                            Zuzalu is a first-of-its-kind pop-up city community in{" "}
                            <span className="relative z-10 inline-block px-2">
                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200"></span>
                                <span className="relative z-10">Montenegro.</span>
                            </span>{" "}
                        </h1>
                        <h1 className="font-normal text-[14px] md:text-[24px] w-[auto] md:w-[600px] leading-[25px] md:leading-[25px]">
                            Join 200 core residents brought together by a shared desire to learn, create, live longer
                            and healthier lives, and build self-sustaining communities.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection
