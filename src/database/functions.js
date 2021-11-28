import axios from "axios"

 
 export const getUserActivities = async () => {
    return await axios.get(`${process.env.REACT_APP_APIURL}/users/${localStorage.getItem("id")}/activities`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
 }