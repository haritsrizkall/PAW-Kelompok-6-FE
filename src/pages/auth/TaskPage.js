import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Sidebar from "../../components/navbar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import TaskCard from "../../components/TaskCard";
import moment from "moment";
import Loader from "../../components/Loader";
import { useTask } from "../../context/TaskContext";

const TaskPage = () => {
    const {state, fetchTask, addTask} = useTask();
    const [addMode, setAddMode] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState(1)
    const [deadline, setDeadline] = useState(moment().format("YYYY-MM-DD"))
    const [isLoading, setIsLoading] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault();
        addTask(title, description, deadline)
            .then((resp) => {
                setAddMode(false);
                setTitle("");
                setDescription("");
                setDeadline(moment().format("YYYY-MM-DD"));
            });
    }

    useEffect(() => {
        fetchTask().then(() => {
            setIsLoading(false);
        });
    }, []);

    if (!localStorage.getItem("token")) {
        return <Navigate to="/"/>
    }
    console.log(state.selectedTask)
    return (
        <>
            {/* Modal */}
            <Loader visible={isLoading}/>
                <div className={addMode ? "absolute bg-black bg-opacity-50 opacity-80 inset-0 z-0 h-full" : "hidden"} onClick={() => setAddMode(false)}></div>
                <div className={addMode ? "w-full max-w-lg p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto my-auto rounded-xl shadow-lg bg-white z-10" : "hidden"}>
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
                    <button className="bg-blue-500 px-10 py-2 rounded-md text-white font-semibold" type="submit">Add Task</button>
                </div>
                </form>
            </div>
            <div className="flex flex-1">
                <Sidebar/>
                <div className="flex-1">
                    <Topbar/>
                    <div className="mx-10 mt-2 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">My Tasks</h1>
                        <button className="cursor-pointer hover:border-blue-500 hover:bg-white hover:text-blue-500 border bg-blue-500 px-8 py-3 rounded-md text-white font-semibold"  onClick={(e) => {
                            e.preventDefault()
                            setAddMode(true);
                        }}>+ New Task</button>
                    </div>
                    <div className="grid grid-cols-3 mt-5">
                       {state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase())).map((val) => (
                           <TaskCard data={val}/>
                       ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskPage;