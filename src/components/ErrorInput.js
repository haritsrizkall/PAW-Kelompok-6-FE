import React from "react"

const ErrorInput = ({text, isVisible}) => {
    return (
        <div className={isVisible ? "my-2" : "hidden"}>
            <p className="text-red-500">{text}</p>
        </div>
    )
}

export default ErrorInput