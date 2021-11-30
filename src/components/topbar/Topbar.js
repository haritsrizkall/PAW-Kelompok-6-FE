import React from "react"
import { useTask } from "../../context/TaskContext"
import profile from "./../../assets/images/profilepicture.png"

const Topbar = () => {
    const {state, search} = useTask();
    const name = localStorage.getItem("name")
    return (
        <div className="flex justify-center items-center w-full">
            <form className="w-1/3 my-10">
                <input className="bg-gray-100 py-2 w-full px-2 rounded-md focus:outline-none" type="text" placeholder="Search Task" value={state.search} onChange={(e) => search(e.target.value)} />
            </form>
            <div className="ml-12 flex items-center">
                <img src={profile} width={40} className="rounded-full"/>
                <p className="ml-2 font-medium">{name}</p>
            </div>
        </div>
    )
}

export default Topbar