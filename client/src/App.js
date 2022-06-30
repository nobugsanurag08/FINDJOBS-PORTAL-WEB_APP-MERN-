import './App.css';
import 'antd/dist/antd.min.css'
// import {Button} from 'antd'
import Home from './pages/Home';
import JobInfo from './pages/JobInfo';
import { BrowserRouter, Outlet, Route, Routes, Redirect } from 'react-router-dom';
import AppliedJobs from './pages/AppliedJobs';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import { useState, CSSProperties, Children } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from './redux/actions/jobActions';
import { useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import PostedJobs from './pages/PostedJobs';
import EditJob from './pages/EditJob';
import { Navigate } from "react-router-dom";
import { getAllUsers } from './redux/actions/userActions';
import UserInfo from './pages/UserInfo';

function App() {
  const { loader } = useSelector(state => state.loaderReducer)
  const user = localStorage.getItem("user");
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllJobs())
    dispatch(getAllUsers())
  }, []);
  return (
    <div className="App">
      {loader && (<div className="sweet-loading text-center">
        <ClipLoader color={'#001529'} />
      </div>)}
      <BrowserRouter>
        <Routes>

          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />

          <Route exact path="/" element=
            {user ? <Home/> : <Navigate to="/login" />}
           />

          <Route exact path="/jobs/:id" element=
            {user ? <JobInfo/> : <Navigate to="/login" />}
           />
           <Route exact path="/postjob" element=
            {user ? <PostJob/> : <Navigate to="/login" />}
           />
           <Route exact path="/profile" element=
            {user ? <Profile/> : <Navigate to="/login" />}
           />
           <Route exact path="/appliedjobs" element=
            {user ? <AppliedJobs/> : <Navigate to="/login" />}
           />
           <Route exact path="/posted" element=
            {user ? <PostedJobs/> : <Navigate to="/login" />}
           />
           <Route exact path="/editjob/:id" element=
            {user ? <EditJob/> : <Navigate to="/login" />}
           />
            <Route exact path="/users/:id" element=
            {user ? <UserInfo/> : <Navigate to="/login" />}
           />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute() {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return Children;
  }
}

