import moment from "moment"
import React from "react"
import { useTask } from "../context/TaskContext";
import trash from "./../assets/images/delete.png"

const TaskCard = ({data}) => {

    const {state, deleteTask, selectTask, editMode} = useTask();
    
    return (
        <div className="border px-4 py-7 mx-3 my-3 shadow-lg rounded-md">
            <div className="flex justify-end" onClick={() => {
                deleteTask(data._id);
            }}>
                <img src={trash} alt="delete" width={30} className="cursor-pointer"/>
            </div>
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
                <p>{data.status == 3 ? 'Done' : data.status == 2 ? 'Doing' : 'To Do'}</p>
            </div>
            <div className="flex mt-7 justify-end self-end">
                <button className="bg-blue-500 px-10 py-2 rounded-md text-white"  onClick={(e) => {
                    e.preventDefault();
                    selectTask(data);
                    editMode(true);

                }}>Edit</button>
            </div>
        </div>
    )
}

export default TaskCard