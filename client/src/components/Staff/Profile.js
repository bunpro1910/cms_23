

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'
import { useQuery } from 'react-query'
import Updateprofile from './Updateprofile'
import Changepass from './Changepass'
function Home() {

<<<<<<< Updated upstream
    let getuser = () => axios.get(`/api/authentication`).then((res) => res.data)
    const [showupdate,setshowupdate] = useState(false)
    const [showchange,setshowchange] = useState(false)
    const { isLoading, error, data, isFetching, refetch } = useQuery('authentication', getuser)
    useEffect(() => {


    }, [])
    if(isLoading) return <>...loading</>

=======
  let getuser = () => axios.get(`/authentication`).then((res) => res.data)
  const [showupdate, setshowupdate] = useState(false)
  const [showchange, setshowchange] = useState(false)
  const { isLoading, error, data, isFetching, refetch } = useQuery('authentication', getuser)
  useEffect(() => {


  }, [])
  if (isLoading) return <>...loading</>
  console.log(data)
>>>>>>> Stashed changes
  return (
    <>
      {showchange ? <Changepass user={data.user} showchange={showchange} setshowchange={setshowchange} /> : ""}
      {showupdate ? <Updateprofile user={data.user} showupdate={showupdate} setshowupdate={setshowupdate} /> : ""}
      
      <div className="w-full flex flex-wrap mt-20 justify-center">
        
        <div className="w-3/5 bg-[#8ec3c3] border-2 border-solid text-left p-4 shadow rounded-md">


          <div className="space-y-3 ">
            
            <p>name: {data.user.fullname}</p>
            <p>Role: {data.user.rolename}</p>
            <p>Phone: {data.user.phone}</p>
            <p>Email: {data.user.email}</p>
            <button type="" className='!no-underline bg-rose-600 text-none p-2 mt-3 rounded-xl font-bold text-center text-white hover:bg-inherit hover:!text-[#e2574c] hover:border-dashed hover:border-2 ' onClick={(e) => { setshowchange(true) }}>Change Password</button>
          </div>
          <button type="" className=' !no-underline bg-rose-600 text-none p-2 mt-3 rounded-xl font-bold text-center text-white hover:bg-inherit hover:!text-[#e2574c] hover:border-dashed hover:border-2' onClick={(e) => { setshowupdate(true) }}>Update</button>
        </div>

      </div>
    </>
  );
}

export default Home;
