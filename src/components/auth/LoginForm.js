import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const [error, setError] = useState("")
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        console.log(password);
        axios.post(`${process.env.REACT_APP_APIURL}/users/login`, {
            email,
            password
        }).then((resp) => {
            console.log(resp.data);
            localStorage.setItem("token", resp.data.data.token);
            localStorage.setItem("id", resp.data.data.id);
            localStorage.setItem("name", resp.data.data.name);
            setIsLogin(true);
        }).catch((err) => {
            console.log(err.response.data.data);
            setError("Wrong email/password")
        })
    }

    if (isLogin) {
        return <Navigate to="/mytask"/>
    }

    return (
        <div className="w-full" onSubmit={onSubmit}>
        <form className="w-1/2 m-auto rounded-lg border-2 border-light-blue-500 border-opacity-70 p-20 lg:p-10 lg:w-9/12 2xl:p-10 md:w-full" > 
            <h1 className="text-3xl mb-4 font-bold">Login</h1>
            {error && (
                <p className="text-l text-red-500">{error}</p>
            )}
            <div className="my-2 py-1">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full rounded" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className="text-right my-2 text-blue-600 py-1">Forgot your password?</p>
            <div className="my-2">
                <input type="submit" className="text-white px-14 py-3 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 active:bg-blue-700  "/>
            </div>
            <p className="font-semibold py-1" >Don't have an account yet? <Link className="text-blue-600 pl-3" to="/register">Sign Up</Link></p>
        </form>

        </div>
    )
}

export default LoginForm;