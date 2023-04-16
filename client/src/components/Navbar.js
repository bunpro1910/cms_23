import { FaHome, FaEye, FaUpload, FaFolder } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FiMenu } from "react-icons/fi";



import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import axios from 'axios'
import Footer from './Footer';
import { toast } from 'react-toastify'

import { useQuery } from 'react-query'

function Navbar({user}) {



  const [navbar, setNavbar] = useState(true)

  useEffect(() => {

  }, [user])
 
  if(!user){
    return <>loadding</>
  }
  return (
    <>


      <nav className={"w-full bg-zinc-800 shadow " }>
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/home" style={{ textDecoration: "none" }} className="hover:text-white">
                <h2 className="text-2xl text-rose-600 font-bold ">FPT Greenwich</h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                }`}
            >
              <ul className="w-fit  uppercase p-4 text-left items-center justify-ceter space-y-3 md:flex md:space-x-6 md:space-y-0 ml-auto mr-auto">

                <li className="navbar-item "><Link to='/home' className='Link hover:text-rose-600 font-bold'>Home <FaHome className="icons" /></Link></li>

                {user.user?.isAdmin || user.user?.isQA ? <li className="navbar-item"><Link to='/manager' className='Link hover:text-rose-600 font-bold'> Dashboard <MdOutlineAdminPanelSettings className="icons" /></Link></li> : ""}

                {user.user != 'not found' ? <>
                  <li className="navbar-item"><Link to='/topic' className='Link hover:text-rose-600  font-bold'>Topic <FaUpload className="icons" /></Link></li>

                  <li className="navbar-item">
                    {localStorage.setItem('user', JSON.stringify(user.user))}

                    <Link to='/profile' className='Link'>{user.user.fullname} </Link></li>
                  <li className="navbar-item"><button onClick={ async(e) => {
                    let result = await axios.get('/api/logout')
                
                    if(result.data.isSuccess) {
                      toast.success(`Logout Successfully`)
                    } else {
                      toast.error(`Logout failed`)
                    }
                  }} className='Link btn-common p-2  bg-rose-600 rounded-xl font-bold '>Logout</button></li></>
                  : <li className="navbar-item "><Link to='login' className='Link btn-common p-2 bg-rose-600 rounded-xl font-bold'>Login </Link></li>}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="navbar" ref={ref}>
      {navbar ? <>
        <ul className={"navbar-list "+ (navbar&&width>840?"flex flex-row":"  mr-24 ml-auto")}>
         

            <li className="navbar-item first" ><Link className='Link'>Greenwich FPT </Link></li>
            <div className={"second "+ (navbar&&width>840?"flex flex-row":"")} ref={socketRef}>
              <li className="navbar-item"><Link to='/home' className='Link'>Home </Link><FaHome className="icons" /></li>

              {user.user?.isAdmin || user.user?.isQA ? <li className="navbar-item"><Link to='/manager' className='Link'> Dashboard </Link><MdOutlineAdminPanelSettings className="icons" /></li> : ""}

              {user.user != 'not found' ? <>
                <li className="navbar-item"><Link to='/topic' className='Link'>Topic </Link><FaUpload className="icons" /></li>

                <li className="navbar-item">
                  {localStorage.setItem('user', JSON.stringify(user.user))}

                  <Link to='/login' className='Link'>{user.user.fullname} </Link></li>
                <li className="navbar-item"><button onClick={(e) => {
                  axios.get('/logout')

                }} className='Link btn-logout'>Logout</button></li></>
                : <li className="navbar-item"><Link to='login' className='Link'>Login </Link></li>}
            </div>
            </ul>
          </> :""}



        
        <button className="nav-resposive" onClick={(e) => { navbar ? setnavbar(false) : setnavbar(true) }}><FiMenu /></button>
      </div> */}


      <Outlet />
    </>
  );
}

export default Navbar;
