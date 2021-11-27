import moment from "moment"
import React from "react"

const TaskCard = ({data}) => {
    return (
        <div className="border px-4 py-7 mx-3 my-3 shadow-lg rounded-md">
            <div className="my-2 mb-6">
                <h3 className="text-2xl font-semibold">{data.title}</h3>
            </div>
            <div className="my-2 text-justify">
                <p>{data.description}</p>
            </div>
            <div className="my-2 flex justify-between">
                <p>Deadline</p>
                <p>{moment(data.deadline).format("DD-MM-YYYY")}</p>
            </div>
            <div className="my-2 flex justify-between">
                <p>Status</p>
                <p>{data.status ? 'Done' : 'To Do'}</p>
            </div>
            <div className="flex mt-7 justify-end">
                <button className="bg-blue-500 px-10 py-2 rounded-md text-white">Edit</button>
            </div>
        </div>
    )
}

export default TaskCard