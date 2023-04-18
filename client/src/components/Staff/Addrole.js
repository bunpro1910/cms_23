

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import { toast } from 'react-toastify'
import 'react-notifications-component/dist/theme.css'
function Login(props) {

  const location = useLocation()
  const navigate = useNavigate()
  let [role, setRole] = useState(
    location.state ? {
      id: location.state.role.id,
      name: location.state.role.name,

    } :
      {
        id: '',
        name: '',
      }
  )
  async function handlesubmit(e) {
    e.preventDefault()
    let { data } = await axios.post(`/api/staff/addrole`, { role, update: location.state?.update, oldid: location.state?.role.id });
    console.log(data)
    if (data.isSuccess) {
      setRole({
        id: '',
        name: '',
      })
      if (location.state?.update) {
        toast.success("update sucessfully")
        navigate('../role')
      } else {
        toast.success('add sucessfully')
        navigate('../role')
      }


    } else {
      toast.success(`add failed with error ${data.message}`)
    }

  }



  useEffect(() => {

  }, [role])

  return (
    <>

      <div className='container'>

        <form className='form-manager' onSubmit={handlesubmit} >

          <div className='mb-3'>
            <label className='form-label'  >Name</label>
            <input type='text' className='form-control' onChange={(e) => { role.name = e.target.value; setRole({ ...role }) }} value={role.name}></input>
          </div>

          <div className='btn-submit-wrap'>
            <button type='submit' className='btn btn-primary'>Add Role</button>
          </div>
        </form>


      </div>
    </>
  );
}

export default Login;
