import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_APIURL}/users`, {
            name,
            email,
            password
        }).then((resp) => {
            console.log(resp.data);
            setIsRegistered(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    if (isRegistered) {
        return <Navigate to="/"/>
    }

    return (
        <div className="w-full" onSubmit={onSubmit}>
        <form className="w-1/2 m-auto rounded-lg border-2 border-light-blue-500 border-opacity-70 p-20 lg:p-10 lg:w-9/12 2xl:p-10 md:w-full">
            <h1 className="text-3xl mb-4 font-bold">Register</h1>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full focus:outline-none rounded" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="my-2 py-1">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full focus:outline-none rounded" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full focus:outline-none rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <p className="text-right my-2 text-blue-600 py-1">Forgot your password?</p>
            <div className="my-2">
                <input type="submit" className="px-14 py-3 rounded cursor-pointer text-white px-14 py-3 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 active:bg-blue-700"/>
            </div>
            <p className="font-semibold py-1">Already have an account? <Link className="text-blue-500 pl-3" to="/">Login</Link></p>
        </form>

        </div>
    )
}

export default RegisterForm;