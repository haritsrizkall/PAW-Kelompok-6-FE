import axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { Navigate } from "react-router";
import Sidebar from "./../components/navbar/Sidebar";
import search from "./../assets/images/search.png"
import profpic from "./../assets/images/profilepicture.png"
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
    const [avatarVal, setAvatarVal] = useState("")
    const [avatarErr, setAvatarErr] = useState("")
    const [isError, setIsError] = useState(false);
    const [modalAvatar, setModalAvatar] = useState(false);
    const {state: userState, fetchUser, updateUser, updateAvatar} = useUser();
    const [imageUrl, setImageUrl] = useState("")

    const avatar = createRef();

    useEffect(() => {
        fetchUser()
        .then(() => {
            setName(userState.user.name)
            setEmail(userState.user.email)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
        })
        console.log('suki')
    }, [userState.user.email, userState.user.name, userState.user.avatar])

    useEffect(() => {
        if(avatar.current){
            if(avatar.current.files.length !== 0){
                if(avatar.current.files[0].type==="image/jpeg" || avatar.current.files[0].type==="image/jpg"){
                    if(avatar.current.files[0].size/1024 <= 512){
                        setAvatarErr("")
                    }else{
                        setAvatarErr("Maksimum ukuran file adalah 1Mb")
                    }
                }else{
                    setAvatarErr("Ekstensi yang didukung adalah jpeg atau jpg")
                }
            }else{
                if(isError){
                    setAvatarErr("Gambar tidak boleh kosong")
                }else{
                    setAvatarErr("")
                }
            }
        }
    }, [avatar,avatarVal,isError])

    if (!localStorage.getItem("token")) {
        return <Navigate to="/"/>
    }

    const submitAvatar = (e) => {
        e.preventDefault();
        let data = new FormData()
        let error = false
        console.log(avatar.current.files)
        if(avatar.current){
            if(avatar.current.files.length !== 0){
                if(avatar.current.files[0].type==="image/jpeg" || avatar.current.files[0].type==="image/jpg"){
                    if(avatar.current.files[0].size/1024 <= 512){
                        error = false
                        data.append("avatar",avatar.current.files[0])
                    }else{
                        error=true
                    }
                }else{
                    error=true
                }
            }else{
                error = true
            }
        }else{
            error = true
        }
        if(error){
            setIsError(true)
        }else{
            setIsError(false)
            setIsLoading(true)
            // Uploading
            axios.post(`${process.env.REACT_APP_APIURL}/users/${localStorage.getItem("id")}/avatar`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log('AMAN')
                // console.log(res.data.data.Location)
                updateAvatar(res.data.data.Location);
                // console.log('USERSTATE AVATAR')
                // console.log(userState.user)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })

        }
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

    const openmodalAvatar = ()=>{
        document.body.classList.add("overflow-y-hidden")
        setModalAvatar(true)
    }

    const closemodalAvatar = ()=>{
        document.body.classList.remove("overflow-y-hidden")
        setModalAvatar(false)
    }

    return (
        <>
        <div onClick={(e)=>{if(e.target.dataset.modal==="img"){closemodalAvatar()}}} data-modal="img" style={{backgroundColor:"rgba(0,0,0,.3)"}} className={!modalAvatar?"hidden":"fixed w-full h-full z-50 inset-0 overflow-y-auto px-3 pb-6"}>
                <div className="relative bg-white rounded-md p-10 w-full max-w-2xl mt-16 mx-auto">
                    <button data-modal="img" onClick={()=>{closemodalAvatar()}} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 top-0 right-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute">
                        <span className="sr-only">Close menu</span>
                    </button>
                    <form onSubmit={submitAvatar} className="mb-3 border border-secondary rounded-md p-3 relative mt-6">
                        <div style={{backgroundColor:"rgba(255,255,255,.4)"}} className={isLoading?"absolute w-full h-full z-10 flex flex-col space-y-3 items-center justify-center":"hidden"}>
                            <p className="text-xl font-bold animate-bounce">Uploading</p>
                        </div>
                        <img alt="" style={{maxHeight:300}} className="mx-auto cursor-pointer" src={userState.user.avatar ? userState.user.avatar : profpic} />
                        <div className="flex flex-col md:flex-row relative items-start mt-1">
                            <div className="flex-1 w-full">
                                <div className="flex items-center relative flex-1 w-full">
                                    <input accept="image/jpg, image/jpeg" ref={avatar} onChange={()=>{avatar.current.files[0]?setAvatarVal(avatar.current.files[0].name):setAvatarVal("")}} style={{color:"rgb(71,85,105)"}} type="file" className="customfileinput flex-1 border py-1 px-1 max-w-full" />
                                    <button type="submit" className="bg-primary hover:bg-secondary transition-colors border-2 rounded-r-md px-3 py-2 font-bold text-sm ml-1">Upload</button>
                                </div>
                                <small className={avatarErr===""?"hidden":"ml-1 text-red-500"}>{avatarErr}</small>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
            <Loader visible={isLoading}/>
            <div className="flex flex-1">
                <Sidebar/>
                <div className="flex-1">
                    <Topbar/>
                    <div className="mx-10 mt-5 flex justify-between items-center">
                        <h1 className="text-3xl font-bold">My Account</h1>
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
                                    <label className="inline-block w-44 mr-6 text-left 
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
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white items-left hover:bg-blue-600" onClick={(e) => {
                                            e.preventDefault();
                                            setEditMode(!editMode);
                                            setName(userState.user.name);
                                            setEmail(userState.user.email);
                                            openmodalAvatar();
                                        }}>
                                            Upload Profile Picture
                                        </button>
                                        <button className="bg-blue-500 px-10 py-2 rounded-md text-white mx-3 hover:bg-blue-600" type="submit">
                                            Save Changes
                                        </button>
                                        <button className="bg-transparent px-10 py-1.5 rounded-md text-blue-500 mx-3 border-2 border-blue-500 hover:bg-gray-200"onClick={(e) => {
                                            e.preventDefault();
                                            setEditMode(!editMode)
                                        }}>
                                            Cancel
                                        </button>
                                        </div>
                                    ): (
                                        <button className="cursor-pointer hover:border-blue-500 hover:bg-white hover:text-blue-500 border bg-blue-500 px-10 py-2 rounded-md text-white" onClick={(e) => {
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