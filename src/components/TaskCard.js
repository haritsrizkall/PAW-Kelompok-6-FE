import moment from "moment"
import React from "react"
import { useTask } from "../context/TaskContext";
import trash from "./../assets/images/close.png"

const TaskCard = ({data}) => {

    const {state, deleteTask, selectTask} = useTask();
    
    return (
        <div className="cursor-pointer hover:border-blue-500 border px-5 py-5 mx-5 my-5 shadow-lg rounded-md">
            <div className="flex justify-end" onClick={() => {
                deleteTask(data._id);
            }}>
                <img src={trash} alt="delete" width={15} className="cursor-pointer"/>
            </div>
            <div className="my-2 mb-3">
                <h3 className="text-2xl font-semibold">{data.title}</h3>
            </div>
            <div className="my-2 text-justify bg-blue-100 px-4 py-4 rounded-md">
                <p>{data.description}</p>
            </div>
            <div className="my-2 flex justify-between font-medium">
                <p>Deadline :</p>
                <p>{moment(data.deadline).format("DD-MM-YYYY")}</p>
            </div>
            <div className="my-2 flex justify-between font-medium">
                <p>Status :</p>
                <p>{data.status ? 'Done' : 'To Do'}</p>
            </div>
            <div className="flex mt-7 justify-end self-end">
                <button className="cursor-pointer hover:border-blue-500 hover:bg-white hover:text-blue-500 border bg-blue-500 px-10 py-2 rounded-md text-white"  onClick={(e) => {
                    e.preventDefault();
                    selectTask(data)
                }}>Edit</button>
            </div>
        </div>
    )
}

export default TaskCard