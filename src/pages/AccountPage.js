import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import Sidebar from "./../components/navbar/Sidebar";
import search from "./../assets/images/search.png"
import profpic from "./../assets/images/profile.png"
import Topbar from "../components/topbar/Topbar";
import Loader from "../components/Loader";
import { useUser } from "../context/UserContext";
import { isValidEmail } from "../utils/validation";
import ErrorInput from "../components/ErrorInput";

const AccountPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {state: userState, fetchUser, updateUser} = useUser();

    useEffect(() => {
        fetchUser()
        .then(() => {
            setIsLoading(false)
            setName(userState.user.name)
            setEmail(userState.user.email)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    if (!localStorage.getItem("token")) {
        return <Navigate to="/"/>
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.patch(`${process.env.REACT_APP_APIURL}/users/${userState.user._id}`, {
            name,
            email
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((resp) => {
            setIsLoading(false)
            setEditMode(false)
            updateUser(resp.data.data)
        }).catch((err) => {
            console.log(err.response.data);
        })

    }

    return (
        <>
            <Loader visible={isLoading}/>
            <div className="flex flex-1">
                <Sidebar/>
                <div className="flex-1">
                    <Topbar/>
                    <div className="mx-10 mt-5 flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">My Account</h1>
                    </div>
                    <div className="flex mx-10 mt-10">
                        <div className="mr-12">
                            <img src={userState.user.avatar ? userState.user.avatar : profpic} width={250} className="rounded-sm"/>
                        </div>
                        <div className="flex-1 ml-12">
                            <form onSubmit={onSubmit}>
                                <div className="flex items-center mb-5">
                                    <label className="inline-block w-44 mr-6 text-left 
                                     font-bold text-l">Name</label>
                                    <div className="flex flex-1 flex-col">
                                        <input  type="text" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} class="flex-1 shadow-md py-3 px-2 bg-gray-100 w-full rounded focus:outline-none" disabled={!editMode} required/>
                                        <ErrorInput text={'Required'} isVisible={!name}/>
                                    </div>
                                </div>
                                <div className="flex items-center mb-5">
                                    <label className="iinline-block w-44 mr-6 text-left 
                                     font-bold text-l">Email</label>
                                     <div className="flex-1 flex flex-col">
                                        <input  type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        class="flex-1 shadow-md py-3 px-2 bg-gray-100 rounded focus:outline-none" disabled={!editMode} required autoComplete="off"/>
                                        <ErrorInput text={'Wrong email format'} isVisible={!isValidEmail(email)}/>
                                        <ErrorInput text={'Required'} isVisible={!email}/>
                                     </div>
                                </div>
                                <div className="flex mt-7 justify-end">
                                    {editMode ? (
                                        <div>
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white mx-3" onClick={(e) => {
                                            e.preventDefault();
                                            setEditMode(!editMode);
                                            setName(userState.user.name);
                                            setEmail(userState.user.email);
                                        }}>
                                            Cancel
                                        </button>
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white mx-3" type="submit">
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