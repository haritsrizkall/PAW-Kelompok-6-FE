import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import Loader from "./Loader";


const EditModal = ({isVisible}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [deadline, setDeadline] = useState("");
    const {state, editMode, updateTask} = useTask();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle(state.selectedTask.title);
        setDescription(state.selectedTask.description);
        setStatus(state.selectedTask.status);
        setDeadline(moment(state.selectedTask.deadline).format("YYYY-MM-DD"));
    }, [state.selectedTask]);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        updateTask(state.selectedTask._id, title, description, deadline, status).then(() => {
            setIsLoading(false);
            editMode(false);
            console.log("Task updated");
            console.log(state.tasks)
        });
    }

    return (
        <>
        <Loader
            visible={isLoading}
        />
         <div className={isVisible ? "absolute bg-black bg-opacity-50 opacity-80 inset-0 z-0 h-full" : "hidden"} onClick={() => editMode(false)}></div>
                <div className={isVisible ? "w-full max-w-lg p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto my-auto rounded-xl shadow-lg bg-white z-10" : "hidden"}>
                <form onSubmit={onSubmit}>
                <div className="pb-2 border-b-2 border-black my-2">
                    <input type="text" placeholder="Title..." value={title} className="shadow-md py-3 px-2 bg-gray-100 w-full rounded" onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <h3 className="mb-2 mt-4 text-lg font-medium">Description</h3>
                <textarea className="shadow-md py-3 px-2 bg-gray-100 w-full rounded h-32 mb-4" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} required/>
                <div className="mb-4 flex">
                    <h3 className="w-40">Deadline</h3>
                    <input type="date" className="cursor-pointer" placeholder="Select date" value={deadline} onChange={(e) => setDeadline(moment(e.target.value).format("YYYY-MM-DD"))}/>
                </div>
                <div className="mb-4 flex">
                    <h3 className="w-40">Status</h3>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={1}>To do</option>
                        <option value={2}>Doing</option>
                        <option value={3}>Done</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 px-10 py-2 rounded-md text-white" type="submit">Edit Task</button>
                </div>
                </form>
                </div>
        </>
    )
}

export default EditModal;