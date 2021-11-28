import axios from "axios";
import React, { useContext, useReducer } from "react";

export const defaultState = {
    user: {
        id: "",
        name: "Jabari",
        email: "",
        password: "",
    }
}

export const Action = {
    Fetch: 'Fetch'
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case Action.Fetch:
            return {
                ...state,
                user: action.payload.user
            }
        default: 
            return state;
            break;
    }
}

const store = React.createContext();

const fetchUser = (dispatch) => {
    return async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_APIURL}/users/${localStorage.getItem("id")}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch({
                type: Action.Fetch,
                payload: {
                    user: response.data.data
                }
            })
        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

export const useUser = () => useContext(store);

export const UserProvider = ({ children, initialState, reducer}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {
        state,
        fetchUser: fetchUser(dispatch)
    }
    return <store.Provider value={value}>{children}</store.Provider>
}