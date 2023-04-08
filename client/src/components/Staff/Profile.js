

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AiOutlineLike } from 'react-icons/ai';
import axios from 'axios'
import { useQuery } from 'react-query'
import Updateprofile from'./Updateprofile'
import Changepass from './Changepass'
function Home() {

    let getuser = () => axios.get(`/api/authentication`).then((res) => res.data)
    const [showupdate,setshowupdate] = useState(false)
    const [showchange,setshowchange] = useState(false)
    const { isLoading, error, data, isFetching, refetch } = useQuery('authentication', getuser)
    useEffect(() => {


    }, [])
    if(isLoading) return <>...loading</>

  return (
    <>
    {showchange?<Changepass user={data.user} showchange={showchange} setshowchange={setshowchange} />:""}
        {showupdate?<Updateprofile user={data.user} showupdate={showupdate} setshowupdate={setshowupdate} />:""}
        <div className="w-full flex flex-wrap mt-20 justify-center">
            <div className="w-3/5 bg-green-100 text-left p-4 shadow rounded-md">
               <div className="space-y-3">
               <p>name: {data.user.fullname}</p>
                <p>Role: {data.user.rolename}</p>
                <p>Phone: {data.user.phone}</p>
                <p>Email: {data.user.email}</p>
                <button type="" className='btn bg-green-400' onClick={(e)=>{setshowchange(true)}}>Change Password</button>
               </div>
                <button type="" className='btn bg-green-400 mt-3' onClick={(e)=>{setshowupdate(true)}}>Update</button>
            </div>
            
        </div>
    </>
  );
}

export default Home;
