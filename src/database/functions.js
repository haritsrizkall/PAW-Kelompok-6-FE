import axios from "axios"

 
 export const getUserActivities = async (userId, token) => {
    return await axios.get(`${process.env.REACT_APP_APIURL}/users/${userId}/activities`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
 }