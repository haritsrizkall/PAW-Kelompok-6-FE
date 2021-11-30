import { getUserActivities } from "../database/functions";
import React, { useContext, useReducer } from "react";
import axios from "axios";

export const defaultState = {
    tasks: [],
    selectedTask: {},
    search: "",
    isEditMode: false,
    updatedTask: {}
}

export const Action = {
    Fetch: 'Fetch',
    Create: 'Create',
    Update: 'Update',
    Delete: 'Delete',
    Search: 'Search',
    SelectTask: 'SelectTask',
    ChangeEditMode: 'ChangeEditMode',
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
            break;
        case Action.Update:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload.task._id ? action.payload.task : task),
            }
            break;
        case Action.SelectTask:
            return {
                ...state,
                selectedTask: action.payload.selectedTask
            }
            break;
        case Action.ChangeEditMode:
            return {
                ...state,
                isEditMode: action.payload.isEditMode,
            }
            break;
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

const selectTask = (dispatch) => {
    return (task) => {
        dispatch({
            type: Action.SelectTask,
            payload: {
                selectedTask: task,
            }
        });
    }
}

const editMode = (dispatch) => {
    return (isEditMode) => {
        dispatch({
            type: Action.ChangeEditMode,
            payload: {
                isEditMode,
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

const updateTask = (dispatch) => {
    return async (id, title, description, deadline, status) => {
        try {
            const updatedTask = await axios.patch(`${process.env.REACT_APP_APIURL}/activities/${id}`, {
                title,
                description,
                deadline,
                status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch({
                type: Action.Update,
                payload: {
                    task: updatedTask.data.data,
                }
            })
        }catch(error) {
            console.log(error.response.data);
        }
    }
}

const addTask = (dispatch) => {
    return async (title, description, deadline, status) => {
        try {
            const newTask = await axios.post(`${process.env.REACT_APP_APIURL}/activities`, {
                title,
                description,
                deadline,
                status
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
        selectTask: selectTask(dispatch),
        editMode: editMode(dispatch),
        updateTask: updateTask(dispatch),
    }

    return <store.Provider value={value}>{children}</store.Provider>;
}