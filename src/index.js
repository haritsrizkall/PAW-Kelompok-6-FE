import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { defaultState, TaskProvider, TaskReducer } from './context/TaskContext';
import { UserProvider, defaultState as defaultStateUser, UserReducer } from './context/UserContext';

require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <UserProvider initialState={defaultStateUser} reducer={UserReducer}>
      <TaskProvider initialState={defaultState} reducer={TaskReducer}>
        <App />
      </TaskProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
