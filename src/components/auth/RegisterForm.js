import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { isValidEmail } from "../../utils/validation";
import ErrorInput from "../ErrorInput";

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
        return <Navigate to="/" state={{
            message: "You have successfully registered. Please login to continue."
        }}/>
    }

    return (
        <div className="w-full" onSubmit={onSubmit}>
        <form className="w-1/2 m-auto">
            <h1 className="text-3xl mb-4 font-bold">Register</h1>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full focus:outline-none rounded" type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="off"/>
            </div>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full focus:outline-none rounded" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="off"/>
                <ErrorInput text={'Wrong email format'} isVisible={!isValidEmail(email) && email}/>
            </div>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full focus:outline-none rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="off"/>
            </div>
            <p className="text-right my-2 text-blue-600">forgot password?</p>
            <div className="my-2">
                <input type="submit" className="px-14 py-3 rounded cursor-pointer"/>
            </div>
            <p>Already have an account? <Link className="text-blue-500" to="/">Login</Link></p>
        </form>

        </div>
    )
}

export default RegisterForm;