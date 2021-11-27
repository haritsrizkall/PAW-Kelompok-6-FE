import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Sidebar from "../../components/navbar/Sidebar";
import search from "./../../assets/images/search.png"
import profile from "./../../assets/images/profile.png"
import Topbar from "../../components/topbar/Topbar";
import TaskCard from "../../components/TaskCard";

const TaskPage = () => {

    const [task, setTask] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("id");
        axios.get(`${process.env.REACT_APP_APIURL}/users/${id}/activities`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setTask(res.data.data);
            console.log(task);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }, [])

    if (!localStorage.getItem("token")) {
        return <Navigate to="/"/>
    }
    return (
        <>
            <div className="flex flex-1">
                <Sidebar/>
                <div className="flex-1">
                    <Topbar/>
                    <div className="mx-5 mt-5 flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">My Tasks</h1>
                        <button className="bg-blue-500 px-8 py-3 rounded-md text-white">New Task</button>
                    </div>
                    <div className="grid grid-cols-3 mt-5">
                       {task.map((val) => (
                           <TaskCard data={val}/>
                       ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskPage;