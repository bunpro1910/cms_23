

import { Link ,useLocation,useNavigate } from 'react-router-dom'
import { useState, useEffect,useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

import {ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {toast} from 'react-toastify'
function Login(props) {
  
  const location = useLocation()
  const navigate = useNavigate()

  let [department, setdepartment] = useState(
    location.state?{
      id:location.state.department.id,
      name: location.state.department.name,

    }:
    { 
      id: '',
      name: '',
    }
  )
  async function handlesubmit(e) {
    e.preventDefault()
    let { data } = await axios.post(`/api/staff/adddepartment`, {department,update:location.state?.update,oldid:location.state?.department.id});
 
    if (data.isSuccess) {
      setdepartment({
        id: '',
        name: '',
      })
      if (location.state?.update) {
        toast.success("update sucessfully")
        navigate('../department')
      } else {
        toast.success('add sucessfully')
        navigate('../department')
      }
     
    } else {
      toast.err(`add failed with err ${data.message}`)
    }

  } 

 

  useEffect(() => { 

  }, [department])

  return (
    <>
    
          <div className='container'>
    
              <form  className='form-manager' onSubmit={handlesubmit} >
             
                <div className='mb-3'>
                  <label className='form-label' >ID</label>
                  <input type='text' className='form-control' onChange={(e) => {department.id = e.target.value;setdepartment({...department})} } value={department.id} ></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label'  >Name</label>
                  <input type='text' className='form-control' onChange={(e) => {department.name = e.target.value;setdepartment({...department})} } value={department.name}></input>
                </div>
            
                <div className='btn-submit-wrap'>
                  <button type='submit'  className='btn btn-primary'>Add department</button>
                </div>
              </form>


          </div>
        </>
        );
}

        export default Login;
