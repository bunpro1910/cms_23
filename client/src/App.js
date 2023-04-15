
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Idea from './components/Idea';
import AddTopic from './components/Staff/Addtopic';
import Topic from './components/Topic';
import Home from './components/Home';
import Addcategory from './components/Staff/Addcategory';
import Addidea from './components/Addidea';
import ManagertopicAdmin from './components/Admin/Managertopic'
import Managertopic from './components/Staff/Managertopic';
import Managercate from './components/Staff/Managercategory';
import Index from './components/Staff/Index';
import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useQuery } from 'react-query'
import 'react-notifications-component/dist/theme.css'
import Addcate from './components/Staff/Addcategory'
import Managerdepartment from './components/Staff/Managerdepartment'
import Adddepartment from './components/Staff/Adddepartment'
import Departmentdetail from './components/Staff/Departmentdetail'
import TermandCondition from './components/TermandCondition'
import Managerole from './components/Staff/Managerole'
import Addrole from './components/Staff/Addrole'
import Manageruser from './components/Admin/Manageuser'
import { ToastContainer } from 'react-toastify'
import CreateAccount from './components/Admin/CreateAccount'
import Profile from './components/Staff/Profile'
import 'react-quill/dist/quill.snow.css';
import Footer from './components/Footer'
function App() {
  let getuser = () => axios.get("/api/authentication").then((res) => res.data)
  const socketRef = useRef();
  const { isLoading, error, data, isFetching, refetch } = useQuery(`authentication`, getuser, { staleTime: Infinity, cacheTime: Infinity })
  const [user,setuser]= useState('')
  useEffect(() => {
    setuser(data)
    socketRef.current = io.connect(`http://localhost:3001/`)
    socketRef.current.on('authentication', (args) => {
      refetch()
   
    })
    
  }, [data])
  if (isLoading) { return <></> }
  return (
    <div className="App">

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Navbar user={user} />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='home' element={<Home />} />
            <Route path='term' element={<TermandCondition />} />

            {data.user != "not found" ?
              <>
                   <Route path='profile' element={<Profile />} />
                <Route path='addidea' element={<Addidea />} />
                <Route path='topic' element={<Topic />} />
                <Route path='idea/:id/:page?' element={<Idea />} />
              </> : <Route path='*' element={<Login />} />}
          </Route>
          {data.user != "not found" ? data.user.isAdmin || data.user.isQA ?
            <>

              <Route path="/manager" element={<Navbar user={user}/>}>
         
                <Route index element={<Index />} />
                <Route path='addcate' element={<Addcate />} />
                <Route path='addtopic' element={<AddTopic />} />
                <Route path='topic' element={<Managertopic />} />
                <Route path='department' element={<Managerdepartment />} />
                <Route path='category' element={<Managercate />} />
                <Route path='addcategory' element={<Addcategory />} />
                <Route path='adddepartment' element={<Adddepartment />} />
                <Route path='departmentdetail' element={<Departmentdetail />} />
                {data.user.isAdmin ? <>
                  <Route path='addaccount' element={<CreateAccount />} />
                  <Route path='addrole' element={<Addrole />} />
                  <Route path='user' element={<Manageruser />} />
                  <Route path='managertopic' element={<ManagertopicAdmin />} />
                  <Route path='role' element={<Managerole />} />
                </> : ""}
              </Route>
            </>
            : "" : ""}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;
