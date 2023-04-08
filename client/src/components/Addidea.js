

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ReactNotifications, Store } from 'react-notifications-component'
import { useQuery } from 'react-query'
import Formdata from 'form-data'
import { toast } from 'react-toastify'
function Login({ state }) {
  let navigate = useNavigate()
  const location = useLocation()
  let [accept, setaccept] = useState(false)

  let [addidea, setaddidea] = useState(
    {
      text: '',
      categoryid: '',
      file: '',
      title: '',
      brief: ''
    }
  )

  let handleSubmit = async (e) => {

    e.preventDefault()
    if (!accept) {
      toast.error("you need to accept term and condition to add new idea")
      return
    } else {
      let form = new Formdata()
      form.append('cateid', addidea.categoryid)
      form.append('text', addidea.text)
      form.append('file', addidea.file)
      form.append('topicid', location.state.topicid)
      form.append('title', addidea.title)
      form.append('brief', addidea.brief)
      let result = await axios.post(`/api/addidea`, form)
      if (result.data.isSuccess) {
        toast.success("you add idea successfully")
        navigate(`/idea/${location.state.topicid}`)
      } else {
        toast.success("you add idea Failed")
      }
    }



  }
  let getcate = () => axios.get(`/category`).then((res) => res.data)

  const { data, isLoading, isError, isFetching } = useQuery(['category'], getcate)

  useEffect(() => {

  }, [])
  if (isLoading) return <>...loading</>
  console.log(data)
  if (!location.state) {
    return <div>
      wrong way
    </div>
  }
  return (
    <>
      <ReactNotifications />
      <div className='container'>
        <form enctype='multipart/form' className='form-manager' onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" onChange={(e) => { addidea.title = e.target.value; setaddidea({ ...addidea }) }} value={addidea.title} class="form-control" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Brief</label>
            <input type="text" onChange={(e) => { addidea.brief = e.target.value; setaddidea({ ...addidea }) }} value={addidea.brief} class="form-control" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Category ID</label>
            <select className='form-control' onChange={(e) => { addidea.categoryid = e.target.value; setaddidea({ ...addidea }) }} value={addidea.categoryid}>
              <option value="" defaultValue={true}>Select category</option>
              {data.category.map((item, i) => {
                return <>
                  <option value={item.id} >{item.id} - {item.name}</option>
                </>
              })}
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">File</label>
            <input type="file" onChange={(e) => { addidea.file = e.target.files[0]; setaddidea({ ...addidea }) }} value={addidea.file.filename} class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Text</label>
            <textarea cols="30" onChange={(e) => { addidea.text = e.target.value; setaddidea({ ...addidea }) }} value={addidea.text} rows="10" ype="password" class="form-control" />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={(e) => { setaccept(e.target.checked) }} checked={accept} />
            <label class="form-check-label" for="exampleCheck1" >You need accept <a className='link-default' href='/term' target="_blank"> term and conditions</a></label>
          </div>

          <button type="submit" class="btn btn-primary " disabled={!accept}>Submit</button>
        </form>
      </div>

    </>

  );
}

export default Login;
