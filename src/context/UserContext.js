import axios from "axios";
import React, { useContext, useReducer } from "react";

export const defaultState = {
    user: {
        id: "",
        name: "",
        email: "",
        password: "",
        avatar: "",
    }
}

export const Action = {
    Fetch: 'Fetch',
    Update: 'Update',
    UpdateAvatar: 'UpdateAvatar',
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case Action.Fetch:
            return {
                ...state,
                user: action.payload.user
            }
        case Action.Update:
            return {
                ...state,
                user: action.payload.user
            }
        case Action.UpdateAvatar:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.payload.avatar
                }
            }
        default: 
            return state;
            break;
    }
}

const store = React.createContext();

const updateAvatar = (dispatch) => {
    return (avatar) => {
        dispatch({
            type: Action.UpdateAvatar,
            payload: {
                avatar: avatar
            }
        })
    }
}

const updateUser = (dispatch) => {
    return async (user) => {
        dispatch({
            type: Action.Update,
            payload: {
                user: user
            }
        });
    }
}

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
        fetchUser: fetchUser(dispatch),
        updateUser: updateUser(dispatch),
        updateAvatar: updateAvatar(dispatch)
    }
    return <store.Provider value={value}>{children}</store.Provider>
}