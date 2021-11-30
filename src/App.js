// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AuthPage from './pages/auth/AuthPage';
import TaskPage from './pages/auth/TaskPage';
import AccountPage from './pages/AccountPage';
import { useEffect } from 'react';
import { fetchTask } from './context/TaskContext';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage Auth="login"/>} />
        <Route path="/register" element={<AuthPage Auth="register"/>} />
        <Route path="/mytask" element={<TaskPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
