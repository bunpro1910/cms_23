

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  let navigate = useNavigate()

  let [username, setusername] = useState('')
  let [password, setpassword] = useState('')
  let [isSuccess, setisSuccess] = useState(false)
  let [err, seterr] = useState('')
  let submit_handle = async (e) => {
    e.preventDefault()
    let { data } = await axios.post(`/api/authentication`, { username: username, password: password })
    console.log(data)
    if (data.isSucess) {
      toast.success("Login Successfully")
      navigate('/home')
    } else {
      toast.error(data.message)
    }
  }
  useEffect(() => {

  }, [err, isSuccess])
  return (

    <div className='login-page'>
      <div className='account-wrap'>
        <button className='sample-account' type="" onClick={(e) => { setusername('bun123@gmail.com'); setpassword("123") }}>Admin Account</button>
        <button className='sample-account' type="" onClick={(e) => { setusername('gokuhieu20@gmail.com'); setpassword("123") }}>QA Account</button>
        <button className='sample-account' type="" onClick={(e) => { setusername('bun456@gmail.com'); setpassword("456") }}>Staff</button>

      </div>
      <ReactNotifications />
      <div className="login" >

        <form className='form-manager' onSubmit={submit_handle}>
          <p>{err ? err : ""}</p>
          <div className='input'>
            <label className='label-input' >User Name</label>
            <input type='text' onChange={(e) => { setusername(e.target.value) }} value={username}></input>
          </div>
          <div className='input'>
            <label className='label-input'  >Password</label>
            <input type='password' onChange={(e) => { setpassword(e.target.value) }} value={password}></input>
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
