import React from "react"
import BaseTemplate from "../Base"

const ContactPage = () => {
    return (
        <BaseTemplate>
            <div className="flex flex-col items-center justify-center border border-black p-5 bg-gray-100 gap-5 w-full h-full">
                <div className="flex flex-col gap-5 p-5 md:p-10 bg-white rounded-lg shadow-md w-full max-w-md">
                    <h1 className="font-semibold text-4xl text-center">Contact</h1>
                    <p className="text-lg">
                        For event or venue support, please email at{" "}
                        <a href="mailto:support@zuzalu.org" className="text-blue-500 hover:underline">
                            support@zuzalu.org
                        </a>
                        .
                    </p>
                    <p className="text-lg">
                        For support related to Zuzalu Passport, please email{" "}
                        <a href="mailto:passport@0xparc.org" className="text-blue-500 hover:underline">
                            passport@0xparc.org
                        </a>
                        .
                    </p>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default ContactPage
