import React from "react"
import DropDownArrow from "../ArrowNavigators/DropDownArrow"
import CollapseArrow from "../ArrowNavigators/CollapseArrow"

const AccordionUI = ({ title, children, Id, Index, setIndex }) => {
    // If the question ID is between 1 and 7, show on UI a title saying Logistics
    // If the question ID is between 8 and 10, show on UI a title saying Participation
    // If the question ID is between 11 and 12, show on UI a title saying Health
    // If the question ID is between 13 and 15, show on UI a title saying Living at Zuzalu

    const handleSetIndex = (Id) => (Index === Id ? setIndex(0) : setIndex(Id))

    return (
        <>
            <div
                onClick={() => handleSetIndex(Id)}
                className="flex w-full justify-between cursor-pointer mx-auto h-auto justify-between items-center px-4 py-5 mt-2 bg-white"
            >
                <div className="flex group cursor-pointer">
                    <div className="text-brand-brown mr-4">{title}</div>
                </div>
                <div className="flex items-center">
                    {Index !== Id ? <DropDownArrow className="w-6 h-6" /> : <CollapseArrow className="w-6 h-6" />}
                </div>
            </div>
            {Index === Id && (
                <div className="flex w-full text-brand-brown text-brand-info opacity-[70%] h-auto px-4 pb-6 ">
                    {children}
                </div>
            )}
        </>
    )
}

export default AccordionUI
