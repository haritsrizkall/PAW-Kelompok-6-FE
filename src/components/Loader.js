import React from "react";

const Loader = ({visible}) => {
    let circleCommonClasses = 'h-4 w-4 bg-current rounded-full';

    return (
        <div className={visible ? 'flex absolute w-full h-full items-center' : 'hidden'}>
            <div className="flex mx-auto">
                <div className={`${circleCommonClasses} mr-2 animate-bounce`}></div>
                <div className={`${circleCommonClasses} mr-2 animate-bounce200`}></div>
                <div className={`${circleCommonClasses} animate-bounce400`}></div>
            </div>
        </div>
    );
}

export default Loader;