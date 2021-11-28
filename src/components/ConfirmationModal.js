import React from "react";
import Loader from "./Loader";


const ConfirmationModal = ({isVisible, title, text}) => {
    
    return (
        <div>
            <Loader visible={isLoading}/>
            <div className={isVisible ? "absolute bg-black bg-opacity-50 opacity-80 inset-0 z-0 h-full" : "hidden"} onClick={() => setAddMode(false)}></div>
            <div className={isVisible ? "w-full max-w-lg p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto my-auto rounded-xl shadow-lg bg-white z-10" : "hidden"}>
                <div>
                    <h1 className="text-2xl font-bold mb-4">{title}</h1>
                    <p>{text}</p>
                </div>
                <div>
                    <a onClick={isVisible}></a>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;