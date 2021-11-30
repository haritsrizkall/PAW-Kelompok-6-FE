import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(false)
    const [error, setError] = useState("")
    const {state: userState, fetchUser} = useUser() 
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_APIURL}/users/login`, {
            email,
            password
        }).then((resp) => {
            localStorage.setItem("token", resp.data.data.token);
            localStorage.setItem("id", resp.data.data.id);
            localStorage.setItem("name", resp.data.data.name);
            
            fetchUser().then(() => {
                setIsLogin(true);
            }).catch(err => {
                console.log(err);
                setIsLogin(true);
            })
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
        <form className="w-1/2 m-auto">
            <h1 className="text-3xl mb-4 font-bold">Login</h1>
            {error && (
                <p className="text-l text-red-500">{error}</p>
            )}
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full rounded" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="my-2">
                <input className="shadow-md py-3 px-2 bg-gray-100 w-full rounded" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className="text-right my-2 text-blue-600">forgot password?</p>
            <div className="my-2">
                <input type="submit" className="px-14 py-3 rounded cursor-pointer"/>
            </div>
            <p>Don't have an account yet? <Link className="text-blue-500" to="/register">Sign Up</Link></p>
        </form>

        </div>
    )
}

export default LoginForm;