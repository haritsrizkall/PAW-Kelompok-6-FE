import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Sidebar from "./../components/navbar/Sidebar";
import search from "./../assets/images/search.png"
import profpic from "./../assets/images/profile.png"
import Topbar from "../components/topbar/Topbar";

const AccountPage = () => {
    const [profile, setProfile] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_APIURL}/users/${localStorage.getItem("id")}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setProfile(res.data.data);
        }).catch((err) => {
            console.log(err.response.data.data);
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
                    <div className="mx-10 mt-5 flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">My Account</h1>
                    </div>
                    <div className="flex mx-10 mt-10">
                        <div className="mr-12">
                            <img src={profpic} width={250} className="rounded-sm"/>
                        </div>
                        <div className="flex-1 ml-12">
                            <form>
                                <div className="flex items-center mb-5">
                                    <label className="inline-block w-44 mr-6 text-left 
                                     font-bold text-l">Name</label>
                                    <input  type="text" id="name" name="name" placeholder="Name" value={profile.name}
                                    class="flex-1 shadow-md py-3 px-2 bg-gray-100 w-full rounded focus:outline-none" disabled={!editMode}/>
                                </div>
                                <div className="flex items-center mb-5">
                                    <label className="iinline-block w-44 mr-6 text-left 
                                     font-bold text-l">Email</label>
                                    <input  type="text" id="email" name="email" placeholder="Email" value={profile.email}
                                    class="flex-1 shadow-md py-3 px-2 bg-gray-100 rounded focus:outline-none" disabled={!editMode}/>
                                </div>
                                <div className="flex items-center mb-5">
                                    <label className="inline-block w-44 mr-6 text-left 
                                     font-bold text-l">Password</label>
                                    <input  type="password" id="password" name="password" placeholder="Password" value={"rahasia"}
                                    class="flex-1 shadow-md py-3 px-2 bg-gray-100 w-full rounded focus:outline-none" disabled={!editMode}/>
                                </div>
                                <div className="flex mt-7 justify-end">
                                    {editMode ? (
                                        <div>
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white mx-3" onClick={(e) => {
                                            e.preventDefault();
                                            setEditMode(!editMode)
                                        }}>
                                            Cancel
                                        </button>
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white mx-3" onClick={(e) => {
                                            e.preventDefault();
                                            setEditMode(!editMode)
                                        }}>
                                            Save Changes
                                        </button>
                                        </div>
                                    ): (
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white" onClick={(e) => {
                                            e.preventDefault();
                                            setEditMode(!editMode)
                                        }}>
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountPage;