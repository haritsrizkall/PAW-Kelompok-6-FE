import { getUserActivities } from "../database/functions";
import React, { useContext, useReducer } from "react";
import axios from "axios";

export const defaultState = {
    tasks: [],
    search: "",
}

export const Action = {
    Fetch: 'Fetch',
    Create: 'Create',
    Update: 'Update',
    Delete: 'Delete',
    Search: 'Search',
}

export const TaskReducer = (state, action) => {
    switch (action.type) {
        case Action.Fetch:
            return {
                ...state,
                tasks: action.payload.tasks,
            }
            break; 
        case Action.Create:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.tasks],
            }
            break;
        case Action.Delete:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload.task),
            }
            break;
        case Action.Search:
            return {
                ...state,
                search: action.payload.search,
            }
        default:
            return state;
            break;
    }
}

const store = React.createContext();

export const useTask = () => useContext(store);

const fetchTasks = (dispatch) => {
    return async () => {
        const response = await getUserActivities();
        dispatch({
            type: Action.Fetch,
            payload: {
                tasks: response.data.data,
            }
        });
    }
}

const search = (dispatch) => {
    return (search) => {
        dispatch({
            type: Action.Search,
            payload: {
                search,
            }
        });
    }
}

const deleteTask = (dispatch) => {
    return async (id) => {
        try {
            const deletedTask = await axios.delete(`${process.env.REACT_APP_APIURL}/activities/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch({
                type: Action.Delete,
                payload: {
                    task: deletedTask.data.data._id,
                }
            })
        }catch(error) {
            console.log(error.response.data);
        }
    }
}

const addTask = (dispatch) => {
    return async (title, description, deadline) => {
        try {
            const newTask = await axios.post(`${process.env.REACT_APP_APIURL}/activities`, {
                title,
                description,
                deadline
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch({
                type: Action.Create,
                payload: {
                    tasks: newTask.data.data,
                }
            });
        } catch (error) {
            console.log(error.response.data);
        }
    }
}

export const TaskProvider = ({ children, initialState, reducer }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const value = {
        state,
        fetchTask: fetchTasks(dispatch),
        addTask: addTask(dispatch),
        deleteTask: deleteTask(dispatch),
        search: search(dispatch),
    }

    return <store.Provider value={value}>{children}</store.Provider>;
}