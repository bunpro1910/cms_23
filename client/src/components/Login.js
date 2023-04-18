

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'


import axios from 'axios'
import { toast } from 'react-toastify'
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";

function Login() {
  let navigate = useNavigate()

  let [username, setusername] = useState('')
  let [password, setpassword] = useState('')


  let submit_handle = async (e) => {
    e.preventDefault()
    let { data } = await axios.post(`/api/authentication`, { username: username, password: password })
    if (data.isSucess) {
      toast.success("Login Successfully")
      navigate('/home')
    } else {
      toast.error(data.message)
    }
  }
  useEffect(() => {

  }, [])
  return (
    <div className='login-page'>
      <div className='account-wrap w-full xl:w-2/5 md:w-3/5 sm:w-full'>
        <button className='sample-account' type="" onClick={(e) => { setusername('bun123@gmail.com'); setpassword("123") }}>Admin Account</button>
        <button className='sample-account' type="" onClick={(e) => { setusername('gokuhieu20@gmail.com'); setpassword("123") }}>QA Account</button>
        <button className='sample-account' type="" onClick={(e) => { setusername('vothanhnamphuong20@gmail.com'); setpassword("123") }}>Staff</button>
        <button className='sample-account' type="" onClick={(e) => { setusername('huutien@gmail.com'); setpassword("123") }}>QA condinater</button>
      </div>
      <div className="login xl:w-3/5 sm:w-full md:w-4/5" >
        <form className='form-manager' onSubmit={submit_handle}>
          <div className='input flex flex-wrap justify-between'>
            <label className='w-full text-2xl font-semibold flex flex-row'  ><RiAdminFill className='mr-2' />User Name</label>
            <input className='form-control' type='text' onChange={(e) => { setusername(e.target.value) }} value={username}></input>
          </div>
          <div className='input'>
            <label className='w-full text-2xl font-semibold  flex flex-row' > <RiLockPasswordFill className='mr-2' />Password</label>
            <input type='password' className='form-control' onChange={(e) => { setpassword(e.target.value) }} value={password}></input>
          </div>
          <div className='btn-submit-wrap'>
            <button onClick={submit_handle} type='submit' className='submit-login login-btn '>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
