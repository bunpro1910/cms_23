

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import Notification from '../Notification'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { toast } from 'react-toastify'
function Login(props) {

  const location = useLocation()
  const navigate = useNavigate()
  let [topic, settopic] = useState(
    location.state ? {
      id: location.state.topic.id,
      name: location.state.topic.name,
      clousuredate: location.state.topic.clousuredate,
      finalclosuredate: location.state.topic.finalclosuredate
    } :
      {
        id: '',
        name: '',
        clousuredate: '',
        finalclosuredate: ''
      }
  )
  async function handlesubmit(e) {
    e.preventDefault()
    let { data } = await axios.post(`/staff/addtopic`, { topic, update: location.state?.update, oldid: location.state?.topic.id });
    console.log(data)
    console.log(data)
    if (data.isSuccess ==true) {
      settopic({
        id: '',
        name: '',
        clousuredate: '',
        finalclosuredate: ''
      })
      if (location.state?.update) {
        toast.success("update sucessfully")
        navigate('/manager/topic')
      } else {
        toast.success('add sucessfully')
        navigate('/manager/topic')
      }


    } else {
      toast.error(`add failed with err ${data.err}`)
    }

  }



  useEffect(() => {

  }, [topic])

  return (
    <>

      <div className='container'>

        <form className='form-manager' onSubmit={handlesubmit} >


          <div className='mb-3'>
            <label className='form-label' >ID</label>
            <input type='text' className='form-control' onChange={(e) => { topic.id = e.target.value; settopic({ ...topic }) }} value={topic.id} ></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'  >Name</label>
            <input type='text' className='form-control' onChange={(e) => { topic.name = e.target.value; settopic({ ...topic }) }} value={topic.name}></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'  >Date</label>
            <input type='datetime-local' className='form-control' onChange={(e) => { topic.clousuredate = e.target.value; settopic({ ...topic }) }} value={topic.clousuredate != '' ? new Date(topic.clousuredate).toISOString().split('Z')[0] : ""}></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'  >Final Date</label>
            <input type='datetime-local' className='form-control' onChange={(e) => { topic.finalclosuredate = e.target.value; settopic({ ...topic }) }} value={topic.finalclosuredate != '' ? new Date(topic.finalclosuredate).toISOString().split('Z')[0] : ""}></input>
          </div>
          <div className='btn-submit-wrap'>
            <button type='submit' className='btn btn-primary'>Add Topic</button>
          </div>
        </form>


      </div>
    </>
  );
}

export default Login;
