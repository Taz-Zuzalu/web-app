// pages/faq.js
import React from "react"
import Accordion from "../components/FAQ/Accordion"
import Head from "next/head"

const Faq = () => {
    return (
        <div className="min-h-screen bg-white">
            <Head>
                <title>FAQ</title>
            </Head>
            <div className="container mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold mb-10">Frequently Asked Questions</h1>
                <Accordion />
            </div>
        </div>
    )
}

export default Faq
