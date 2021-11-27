import React from "react"
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import logo from "./../../assets/images/logo.png"
const AuthPage = ({Auth}) => {
    return (
        <div className="w-full h-screen flex">
            <div className="bg-blue-100 flex-1 flex">
                <img src={logo} width={250} className="m-auto"/>
            </div>
            <div className="flex-1 text-center flex flex-col justify-center">
                {Auth == "login"? <LoginForm/> : <RegisterForm/>}
            </div>
        </div>
    )
}

export default AuthPage;