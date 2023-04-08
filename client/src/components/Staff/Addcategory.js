

import { Link ,useLocation,useNavigate} from 'react-router-dom'
import { useState, useEffect,useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Notification from '../Notification'
import {ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {toast} from 'react-toastify'
function Login(props) {

  const location = useLocation()
  const navigate = useNavigate()
  let [category, setcategory] = useState(
    location.state?{
      id:location.state.category.id,
      name: location.state.category.name,

    }:
    { 
      id: '',
      name: '',
    }
  )
  async function handlesubmit(e) {
    e.preventDefault()
    let { data } = await axios.post(`/staff/addcategory`, {category,update:location.state?.update,oldid:location.state?.category.id});
    console.log(data)
    if (data.isSuccess) {
      setcategory({
        id: '',
        name: '',
      })
      if (location.state?.update) {
        toast.success("update sucessfully")
        navigate('../cate')
      } else {
        toast.success('add sucessfully')
        navigate('../cate')
      }

     
    } else {
      toast.err(`add failed with err ${data.message}`)
    }

  } 

 

  useEffect(() => { 

  }, [category])

  return (
    <>
      <ReactNotifications/>
          <div className='container'>
    
              <form className='form-manager' onSubmit={handlesubmit} >
             
                <div className='mb-3'>
                  <label className='form-label' >ID</label>
                  <input type='text' className='form-control' onChange={(e) => {category.id = e.target.value;setcategory({...category})} } value={category.id} ></input>
                </div>
                <div className='mb-3'>
                  <label className='form-label'  >Name</label>
                  <input type='text' className='form-control' onChange={(e) => {category.name = e.target.value;setcategory({...category})} } value={category.name}></input>
                </div>
            
                <div className='btn-submit-wrap'>
                  <button type='submit'  className='btn btn-primary'>Add Category</button>
                </div>
              </form>


          </div>
        </>
        );
}

        export default Login;
