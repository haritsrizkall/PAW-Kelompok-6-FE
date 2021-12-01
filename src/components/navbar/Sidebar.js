import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../../assets/images/logo.png'
import account from './../../assets/images/navbar/account.png'
import tasks from './../../assets/images/navbar/task.png'
import logout from './../../assets/images/navbar/logout.png'
const Sidebar = () => {
    
    const logoutFunc = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('id');
        window.location.href = '/'
    }

    return (
        <div className="w-96 flex-shrink-0 hidden overflow-y-auto flex md:block min-h-screen border-r-2 bg-blue-50">
            <div className="flex justify-center mt-12">
                <img src={logo} width={120}/>
            </div>
            <div className="ml-8 mt-4">
                <div className="my-8 flex">
                    <img src={account} className="ml-10" width={30}/>
                    <Link className="text-xl font-semibold ml-3 cursor-pointer hover:text-blue-500" to="/account">My Account</Link>
                </div>
                <div className="my-8 flex">
                    <img src={tasks} className="ml-10" width={30}/>
                    <Link className="text-xl font-semibold ml-3 cursor-pointer hover:text-blue-500" to="/mytask">My Tasks</Link>
                </div>
                <div className="my-8 flex">
                    <img src={logout} className="ml-10" width={30}/>
                    <p className="text-xl font-semibold ml-3 cursor-pointer hover:text-blue-500" onClick={logoutFunc}>Log Out</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar