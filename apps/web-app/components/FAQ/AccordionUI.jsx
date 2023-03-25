import React from "react"

const AccordionUI = ({ title, Id, children, Index, setIndex }) => {
    // If the question ID is between 1 and 7, show on UI a title saying Logistics
    // If the question ID is between 8 and 10, show on UI a title saying Participation
    // If the question ID is between 11 and 12, show on UI a title saying Health
    // If the question ID is between 13 and 15, show on UI a title saying Living at Zuzalu

    const isActive = Index === Id

    const handleClick = () => {
        if (isActive) {
            setIndex(null)
        } else {
            setIndex(Id)
        }
    }

    return (
        <div className="w-full">
            <button
                className={`w-full py-4 px-6 flex justify-between items-center ${
                    isActive ? "bg-brand-blue text-white" : "bg-white text-brand-blue"
                }`}
                onClick={handleClick}
            >
                <span>{title}</span>
                <span>{isActive ? "-" : "+"}</span>
            </button>
            {isActive && <div className="px-6 py-4 border-l-2 border-brand-blue">{children}</div>}
        </div>
    )
}

export default AccordionUI
